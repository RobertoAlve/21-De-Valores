package br.com.valores1.de.valores.controllers;

import br.com.valores1.de.valores.entidades.Baralho;
import br.com.valores1.de.valores.entidades.Carta;
import br.com.valores1.de.valores.entidades.Jogador;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/game")
public class GameController {

    ArrayList<String> caracteres = new ArrayList<>(
            List.of("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")
    );
    ArrayList<String> naipes = new ArrayList<>(
            List.of("Ourus", "Paus", "Espada", "Coracao")
    );
    ArrayList<Integer> valores = new ArrayList<Integer>(
            List.of(1,2,3,4,5,6,7,8,9,10,11,12,13)
    );

    Baralho baralho;
    Jogador jogador1 = new Jogador("Jogador 1");
    Jogador jogador2 = new Jogador("Jogador 2");
    int vez = 0;

    Jogador[] jogadores = new Jogador[] {jogador1, jogador2};

    @PostMapping
    public void iniciarJogo() {
        baralho = new Baralho();
        int count = 0;

        for (String n:naipes) {
            for (String c:caracteres) {
                Carta carta = new Carta(n, c, valores.get(count));
                baralho.adicionarCarta(carta);
                count++;
            }
            count = 0;
        }

        Collections.shuffle(Arrays.asList(baralho.getBaralho()), new Random());
        for (Object c : baralho.getBaralho()) {
            System.out.println(c);
        }

        for (Jogador j:jogadores) {
            this.separarCartas(j);
        }

        System.out.println(jogador1);
        System.out.println(jogador2);
    }

    public void separarCartas(Jogador j) {
        for (int i = 0; i < 2; i++) {
            Carta carta = this.pedirCarta();
            j.addCarta(carta);
        }
    }

    @GetMapping("/pedirCartaVez")
    public Carta pedirCartaVez() {
        Carta cart = baralho.getCarta();

        jogadores[vez].addCarta(cart);
        jogadores[vez].setCountPontosCarta(cart.getValor());

        if (jogadores[vez].getCountPontosCarta() > 21) {
            //derrota
        } else {
            //vitoria
        }

        return cart;
    }

    public Carta pedirCarta() {
        return baralho.getCarta();
    }

    @PostMapping("/passarAVez")
    public void passarAVez() {
        if (vez == 1) {
            vez = 0;
        } else {
            vez = 1;
        }
    }

}
