package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Model.Actor;
import ir.ac.ut.ece.ie.Model.Movie;
import ir.ac.ut.ece.ie.Storage.Storage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ActorService {

    @RequestMapping(value = "/GetActorMovies/{actor_id}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse GetActorMovies(
            @PathVariable(value = "actor_id") int actor_id){

        try {
            //Actor actor = Storage.Database.GetActorById(actor_id);
            ArrayList<Movie> movieActedList = Storage.Database.GetTotalMovieActedIn(actor_id);
            return new ServiceResponse(movieActedList, false, "200", "message");
        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/GetActorDetails/{actor_id}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse GetActorDetails(
            @PathVariable(value = "actor_id") int actor_id){

        try {
            Actor actor = Storage.Database.GetActorById(actor_id);
            return new ServiceResponse(actor, false, "200", "message");
        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }
}
