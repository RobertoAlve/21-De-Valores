package br.com.valores1.de.valores.entidades;

public class PilhaObj<T> {

    private T[] pilha;
    private int topo;

    public PilhaObj(int capacidade) {
        this.topo = -1;
        this.pilha = (T[]) new Object[capacidade];
    }

    public Boolean isEmpty() {
        return this.topo == -1;
    }

    public Boolean isFull() {
        return (this.topo + 1) == this.pilha.length;
    }

    public void push(T info) {
        if (isFull()) {
            throw new IllegalStateException();
        }
        this.pilha[++this.topo] = info;
    }

    public T pop() {
        if (isEmpty()) {
            return null;
        }
        return this.pilha[this.topo--];
    }

    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return this.pilha[this.topo];
    }

    public void exibe() {
        if (isEmpty()) {
            System.out.println("Pilha vazia!");
        }
        for (int i = this.topo; i >= 0; i--) {
            System.out.println(this.pilha[i]);
        }
    }

    public T[] getPilha() {
        return pilha;
    }
}
