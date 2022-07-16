package br.com.valores1.de.valores.entidades;

import java.util.ArrayList;
import java.util.List;

public class Baralho<T> {

    private PilhaObj<Carta> cartas = new PilhaObj<>(52);

    public Baralho() {}

    public PilhaObj<Carta> getCartas() {
        return cartas;
    }

    public void setCartas(PilhaObj<Carta> cartas) {
        this.cartas = cartas;
    }

    public void adicionarCarta(Carta carta) {
        this.cartas.push(carta);
    }

    public T[] getBaralho() {
        return (T[]) this.cartas.getPilha();
    }

    public Carta getCarta() {
        return this.cartas.pop();
    }
}
