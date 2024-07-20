import { Router } from "express";
import { check } from "express-validator";
import { createAppointment, getAppointmentById, rescheduleAppointment } from "./appointment.container.js";

import { userExists,
    appointmentExists
 } from "../helpers/db-validatirAppointment.js";   
const router = Router();

router.post(
    "/new",
    [
        check("idPatient", 'El id del patient es obligatorio').isMongoId().custom(userExists),
        check("idPhycologist", 'El id del psicólogo es obligatorio').isMongoId().custom(userExists),
        check("date", 'La fecha es obligatoria').isDate({format: 'DD-MM-YYYY'}),
        check("notes", 'Las notas son obligatorias').not().isEmpty(),
    ],
    createAppointment
);

router.get(
    "/:id",
    [
        check("id", 'El id de la cita es obligatorio').isMongoId(),
    ],
    getAppointmentById
);

router.put(
    "/reschedule/:id",
    [
        check("id", 'El id de la cita es obligatorio').isMongoId().custom(appointmentExists),
        check("date", 'La nueva fecha es obligatoria').isDate({format: 'DD-MM-YYYY'}),
    ],
    rescheduleAppointment
);

export default router;
