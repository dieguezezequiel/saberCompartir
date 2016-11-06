package com.sabercompartir.enums;

/**
 * Created by fede on 05/11/16.
 */
public enum EstadoSolicitud {

    PENDIENTE ("Pendiente"),
    A_REALIZARSE ("A Realizarse"),
    ELIMINADA("Eliminada");

    private final String descripcion;

    EstadoSolicitud (String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public static EstadoSolicitud createFromString(String name) {

        EstadoSolicitud answer;

        if (name.compareTo(PENDIENTE.name()) == 0) {
            answer = PENDIENTE;

        } else if (name.compareTo(A_REALIZARSE.name()) == 0) {
            answer = A_REALIZARSE;

        } else if (name.compareTo(ELIMINADA.name()) == 0) {
            answer = ELIMINADA;

        } else {

            throw new RuntimeException("El estado es invalido.");
        }

        return answer;
    }
}
