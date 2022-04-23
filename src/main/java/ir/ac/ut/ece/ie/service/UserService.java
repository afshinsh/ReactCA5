package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Model.Comment;
import ir.ac.ut.ece.ie.Model.Rate;
import ir.ac.ut.ece.ie.Model.WatchList;
import ir.ac.ut.ece.ie.Storage.Storage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserService {

    @RequestMapping(value = "/AddWatchList", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse AddWatchList(
            @RequestParam(value = "movie_id") int movie_id){

        try {
            Storage.Database.AddWatchList(new WatchList(Storage.Database.CurrentUser.email, movie_id));
            return new ServiceResponse(null, true, "200", "success");
        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/RemoveWatchList", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse RemoveWatchList(
            @RequestParam(value = "movie_id") int movie_id){

        try {
            Storage.Database.RemoveFromWatchList(new WatchList(Storage.Database.CurrentUser.email, movie_id));
            return new ServiceResponse(null, true, "200", "success");
        }
        catch (Exception e){
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }
}

