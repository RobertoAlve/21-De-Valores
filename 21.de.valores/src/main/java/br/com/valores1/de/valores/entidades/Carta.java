package br.com.valores1.de.valores.entidades;

public class Carta {

    private String naipe;
    private String caracter;
    private int valor;

    public Carta(String naipe, String caracter, int valor) {
        this.naipe = naipe;
        this.caracter = caracter;
        this.valor = valor;
    }

    public String getNaipe() {
        return naipe;
    }

    public void setNaipe(String naipe) {
        this.naipe = naipe;
    }

    public String getCaracter() {
        return caracter;
    }

    public void setCaracter(String caracter) {
        this.caracter = caracter;
    }

    public int getValor() {
        return valor;
    }

    public void setValor(int valor) {
        this.valor = valor;
    }

    @Override
    public String toString() {
        return "Carta{" +
                "naipe='" + naipe + '\'' +
                ", caracter='" + caracter + '\'' +
                ", valor=" + valor +
                '}';
    }
}
