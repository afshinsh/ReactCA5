package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Model.*;
import ir.ac.ut.ece.ie.Storage.Storage;
import ir.ac.ut.ece.ie.Views.MovieListView;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(value = "/GetWatchList", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse GetWatchList(){

        try {
            List<MovieListView> movieList = Storage.Database.GetUserWatchList();
            return new ServiceResponse(movieList, true, "200", "success");
        }
        catch (Exception e){
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/GetRecommendedMovies", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse GetRecommendedMovies(){

        try {
            List<Movie> recommendList = Storage.Database.GetRecommendedWatchList();
            return new ServiceResponse(recommendList, true, "200", "success");
        }
        catch (Exception e){
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/Login", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse Login(
            @RequestParam(value = "email") String email){
        try {
            User user = Storage.Database.getUserByEmail(email);
            if(user == null)
                return new ServiceResponse(null, false, "404", "Not Found");
            else{
                Storage.Database.CurrentUser = user;
                return new ServiceResponse(user.name, true,"200", "success");
            }
        }
        catch (Exception e){
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/Logout", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void LogOut(){
        Storage.Database.CurrentUser = null;
    }
}