package ir.ac.ut.ece.ie.service;

import ir.ac.ut.ece.ie.Storage.Storage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InitService {

    @RequestMapping(value = "/setInfo", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void setInfo() {
        if (!Storage.Database.DataAddedd)
            Storage.Database.SetInformations();
    }

}
