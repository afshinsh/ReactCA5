package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Model.Comment;
import ir.ac.ut.ece.ie.Model.Rate;
import ir.ac.ut.ece.ie.Model.Vote;
import ir.ac.ut.ece.ie.Model.WatchList;
import ir.ac.ut.ece.ie.Storage.Storage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieService {
    @RequestMapping(value = "/addComment", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse AddComment(
            @RequestParam(value = "movie_id") int movie_id,
            @RequestParam(value = "commentText") String commentText) {
        Comment comment = new Comment(Storage.Database.CurrentUser.email, movie_id, commentText);
        try {
            var response = Storage.Database.AddComment(comment);
            return new ServiceResponse(response, response, "200", "Success");

        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/rateMovie", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse RateMovie(
            @RequestParam(value = "movie_id") int movie_id,
            @RequestParam(value = "quantity") int rate){

        try {
            Storage.Database.AddRateMovie(new Rate(Storage.Database.CurrentUser.email, movie_id, rate));
            return new ServiceResponse(null, true, "200", "success");
        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }

    @RequestMapping(value = "/voteComment", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ServiceResponse voteComment(
            @RequestParam(value = "movie_id") int movie_id,
            @RequestParam(value = "form_comment_id") int form_comment_id,
            @RequestParam(value = "voteValue") int voteValue){

        try {
            Vote vote = new Vote(Storage.Database.CurrentUser.email, Integer.valueOf(form_comment_id), voteValue);
            Storage.Database.AddVote(vote);
            return new ServiceResponse(null, true, "200", "success");
        } catch (Exception e) {
            return new ServiceResponse(null, false, "401", e.getMessage());
        }
    }
}

