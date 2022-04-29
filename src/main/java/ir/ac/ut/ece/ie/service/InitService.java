package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Storage.Storage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class InitService {

    @RequestMapping(value = "/SetInfo", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void setInfo(@RequestParam(value = "email") String email) {

        if (!Storage.Database.DataAddedd)
            Storage.Database.SetInformations();

        if(!email.equals("empty"))
            Storage.Database.CurrentUser = Storage.Database.getUserByEmail(email);
    }

}
