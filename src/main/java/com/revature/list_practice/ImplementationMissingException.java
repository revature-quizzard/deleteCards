package com.revature.list_practice;

public class ImplementationMissingException extends RuntimeException {
    public ImplementationMissingException() {
        super("There is no implementation for this method!");
    }
}
