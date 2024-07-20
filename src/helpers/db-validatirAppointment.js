import Appointment from "../appointment/appointment.model.js";
/**Importar el modelo de usuario */

// Verificar si el usuario existe
export const userExists = async (id = "") => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`El usuario con el ID ${id} no existe`);
    }
};

// Verificar si la cita existe
export const appointmentExists = async (id = "") => {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        throw new Error(`La cita con el ID ${id} no existe`);
    }
};
