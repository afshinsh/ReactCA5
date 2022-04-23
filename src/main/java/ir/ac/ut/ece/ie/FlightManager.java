package ir.ac.ut.ece.ie;

import ir.ac.ut.ece.ie.repository.FlightRepository;

public class FlightManager {
    private static FlightManager instance;

    private FlightManager() {

    }

    public static FlightManager getInstance() {
        if (instance == null)
            instance = new FlightManager();
        return instance;
    }

    public void bookFlight(String destination, Integer numberOfTickets) {
        FlightRepository.getInstance().updateAvailableSeats(destination, numberOfTickets);
    }

}
