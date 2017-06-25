package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.TrackerDAO;
import entities.Tracker;

@RestController
public class TrackerController {
	
	@Autowired
	private TrackerDAO trackerDAO;

	// routes
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "trackers", method = RequestMethod.GET)
	public List<Tracker> index() {
		return trackerDAO.index();
	}
	
	@RequestMapping(path = "trackers/{id}", method = RequestMethod.GET)
	public Tracker show(@PathVariable int id){
		return trackerDAO.show(id);
	}
	
	@RequestMapping(path = "trackers", method = RequestMethod.POST)
	public Tracker create(@RequestBody String trackerJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Tracker mappedTracker = null;
		
		try {
			mappedTracker = mapper.readValue(trackerJSON, Tracker.class);
			mappedTracker = trackerDAO.create(mappedTracker);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mappedTracker;
	}
	
	@RequestMapping(path = "trackers/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id){
		return trackerDAO.destroy(id);
	}
	
	@RequestMapping(path = "trackers/{id}", method = RequestMethod.PUT)
	public Tracker update(@RequestBody String trackerJSON, @PathVariable int id){
		
		ObjectMapper mapper = new ObjectMapper();
		Tracker updatedTracker = null;
		try {
			updatedTracker = mapper.readValue(trackerJSON, Tracker.class);
			updatedTracker = trackerDAO.update(id, updatedTracker);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return updatedTracker;
		
	}
	
//	@RequestMapping(path = "addresses/{id}", method = RequestMethod.PUT)
//	public Address update(@RequestBody String addressJSON, @PathVariable int id){
//		
//		ObjectMapper mapper = new ObjectMapper();
//		Address updatedAddress = null;
//		try {
//			updatedAddress = mapper.readValue(addressJSON, Address.class);
//			updatedAddress = addressDAO.update(updatedAddress, id);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return updatedAddress;
//		
//	}

}
