package data;

import java.util.List;

import entities.Tracker;

public interface TrackerDAO {
	public List<Tracker> index();
	public Tracker show(int id);
	public Tracker create(Tracker tracker);
	public Tracker update(int id, Tracker tracker);
	public boolean destroy(int id);
	

}
