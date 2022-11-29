import React from "react";
import "./SeleccionarFecha.scss";

import Swal from 'sweetalert2';

import { toast } from 'react-toastify';

import axios from "axios";

import { useUserContext } from "../../../../../../../../../contexts/UserContext";

import { useConfigContext } from "../../../../../../../../../contexts/ConfigContext";

import { useNavigate } from "react-router";

import { gapi } from 'gapi-script';


const SeleccionarFecha = ({ dateInfo }) => {

    // GOOGLE CALENDAR API -----------------------------------------------------

    const CLIENT_ID = "329918589866-gkonr7r35d6n73ipjser4joe2u2f85kh.apps.googleusercontent.com"
    const API_KEY = "AIzaSyAGNqge0MYWjrTIh9CSuP3tZVOiSkJdGOU"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"


    const _yy = new Date(dateInfo.fechaCita);

    const yy = _yy.toISOString().substring(0, 4);
    const mm = _yy.toISOString().substring(5, 7);
    const dd = _yy.toISOString().substring(8, 10);


    // ---------------------------------------------------------------------------


    const { user } = useUserContext();

    const navigate = useNavigate();

    const { startLoading, stopLoading } = useConfigContext();

    const handleClick = (e) => {
        e.preventDefault();

        if (dateInfo.ocupados === dateInfo.cupos) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay cupos disponibles',
                footer: 'Intenta con otra fecha'
            })
            return;
        } else {
            addUserToDate();
            addDateToUser();
            upadteOcupados();

            Swal.fire({
                title: 'Cita agregada correctamente',
                text: "Deseas agregarla a Google Calendar?",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, gracias',
                confirmButtonText: 'Agregar a Google Calendar'
            }).then((result) => {
                if (result.isConfirmed) {
                    addToCalendar();
                    navigate("/");
                }
                else {
                    navigate("/");
                }
            })
        }
    }

    const addToCalendar = () => {

        window.gapi.load("client:auth2", () => {

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
                plugin_name: "chat",
                ux_mode: 'redirect'
            });

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    var event = {
                        'summary': 'Donación de sangre',
                        'location': 'PQ3Q+QX7, Av Baden Powell, San Salvador',
                        'description': 'Has realizado una cita para tu donación de sangre' ,
                        'start': {
                          'dateTime': `${yy}-${mm}-${dd}T09:00:00-07:00`,
                          'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                          'dateTime': `${yy}-${mm}-${dd}T17:00:00-07:00`,
                          'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                          'RRULE:FREQ=DAILY;COUNT=1'
                        ],
                        'reminders': {
                          'useDefault': false,
                          'overrides': [
                            {'method': 'email', 'minutes': 24 * 60},
                            {'method': 'popup', 'minutes': 10}
                          ]
                        }
                      }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })

                })
        });
    }



    const upadteOcupados = async () => {
        try {
            startLoading();

            const dateid = dateInfo._id;
            console.log(dateid);

            await axios.post("/date/updateOcupados", { dateid });

        } catch (error) {
            toast.error("Unexpected error!");
        } finally {
            stopLoading();
        }
    }


    const addDateToUser = async () => {
        try {
            startLoading();

            const identifier = user.dui;
            const dateId = dateInfo._id;

            await axios.post("/auth/addDateToUser", { identifier, dateId });

        } catch (error) {
            const { status } = error.response || { status: 500 };
            const msg = {
                "404": "Not Found",
                "500": "Something went wrong!"
            }

            toast.error(msg[status.toString()] || "Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    const addUserToDate = async () => {
        try {
            startLoading();

            const dui = user.dui;
            const dateIdentifire = dateInfo._id;

            await axios.post("/date/addUserToDate", { dui, dateIdentifire });

        } catch (error) {
            const { status } = error.response || { status: 500 };
            const msg = {
                "404": "Not Found",
                "500": "Something went wrong!"
            }

            toast.error(msg[status.toString()] || "Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    return (
        <div className="seleccionarfecha">
            <button onClick={handleClick}> Seleccionar</button>
        </div>)
}

export default SeleccionarFecha;