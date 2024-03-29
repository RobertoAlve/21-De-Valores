package br.com.valores1.de.valores.controllers;

import br.com.valores1.de.valores.entidades.Baralho;
import br.com.valores1.de.valores.entidades.Carta;
import br.com.valores1.de.valores.entidades.Jogador;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        vez = 0;

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
            j.setCartasIniciais(new ArrayList<>());
            j.zerarCountPontosCarta(0);
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
    public ResponseEntity<Carta> pedirCartaVez() {
        Carta cart = baralho.getCarta();

        jogadores[vez].addCarta(cart);
        jogadores[vez].setCountPontosCarta(cart.getValor());

        return ResponseEntity.status(200).body(cart);
    }

    public Carta pedirCarta() {
        return baralho.getCarta();
    }

    @GetMapping("/pontosTotais")
    public ResponseEntity<Integer[]> getPontosTotais() {
        Integer[] pontosTotais = new Integer[2];
        pontosTotais[0] = jogador1.getPontosTotais();
        pontosTotais[1] = jogador2.getPontosTotais();
        return ResponseEntity.status(200).body(pontosTotais);
    }

    @PostMapping("/pontosTotais1")
    public void attPontosJogador1() {
        jogadores[0].setPontosTotais(jogadores[0].getPontosTotais() + 100);
    }

    @PostMapping("/pontosTotais2")
    public void attPontosJogador2() {
        jogadores[1].setPontosTotais(jogadores[1].getPontosTotais() + 100);
    }

    @PostMapping("/vez")
    public void passarAVez() {
        if (vez == 1) {
            vez = 0;
        } else {
            vez = 1;
        }
    }

    @GetMapping("/vez")
    public ResponseEntity<Integer> pegarVez() {
        return ResponseEntity.status(200).body(vez);
    }

    @GetMapping
    public ResponseEntity<Jogador[]> obterDadosJogadore() {
        return ResponseEntity.status(200).body(jogadores);
    }

}
