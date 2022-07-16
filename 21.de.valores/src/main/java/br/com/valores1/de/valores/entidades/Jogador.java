package br.com.valores1.de.valores.entidades;

import java.util.ArrayList;

public class Jogador {

    private String nome;
    private Integer pontos;
    private Integer countPontosCarta = 0;
    private ArrayList<Carta> cartasIniciais = new ArrayList<>();

    public Jogador(String nome) {
        this.nome = nome;
        this.pontos = 0;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }

    public void addCarta(Carta c) {
        this.countPontosCarta += c.getValor();
        cartasIniciais.add(c);
    }

    public Integer getCountPontosCarta() {
        return countPontosCarta;
    }

    public void setCountPontosCarta(Integer countPontosCarta) {
        this.countPontosCarta += countPontosCarta;
    }

    public ArrayList<Carta> getCartasIniciais() {
        return cartasIniciais;
    }

    public void setCartasIniciais(ArrayList<Carta> cartasIniciais) {
        this.cartasIniciais = cartasIniciais;
    }

    @Override
    public String toString() {
        return "Jogador{" +
                "nome='" + nome + '\'' +
                ", pontos=" + pontos +
                ", countPontosCarta=" + countPontosCarta +
                ", cartasIniciais=" + cartasIniciais +
                '}';
    }
}
