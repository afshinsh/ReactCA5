package ir.ac.ut.ece.ie.service;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ir.ac.ut.ece.ie.FlightManager;
import ir.ac.ut.ece.ie.repository.FlightRepository;

@RestController
public class FlightService {

	@RequestMapping(value = "/getAvailableSeats/{destination}", method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public FlightInfo getAvailableSeats(@PathVariable(value = "destination") String destination) {
		FlightInfo info = new FlightInfo();
		info.setAvailable(FlightRepository.getInstance().getAvailableSeats(destination));
		return info;
	}

	@RequestMapping(value = "/bookTheFlight", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public BookingResult bookTheFlight(
			@RequestParam(value = "destination") String destination,
			@RequestParam(value = "numberOfTickets") int numberOfTickets,
			@RequestParam(value = "firstName") String firstName,
			@RequestParam(value = "lastName") String lastName) {
    	FlightManager.getInstance().bookFlight(destination, numberOfTickets);
    	BookingResult result = new BookingResult();
    	result.setSuccessful(true);
    	return result;
	}
}
