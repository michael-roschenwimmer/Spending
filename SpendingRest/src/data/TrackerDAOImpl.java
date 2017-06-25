package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Tracker;

@Transactional
public class TrackerDAOImpl implements TrackerDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Tracker> index() {
		String query = "Select t from Tracker t";
		return em.createQuery(query, Tracker.class).getResultList();
	}

	@Override
	public Tracker show(int id) {
		return em.find(Tracker.class, id);
	}

	@Override
	public Tracker create(Tracker tracker) {
		try {
			em.persist(tracker);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return em.find(Tracker.class, tracker.getId());
	}

	@Override
	public Tracker update(int id, Tracker t) {
		Tracker updatedTracker = null;

		try {
			updatedTracker = em.find(Tracker.class, id);

			if (t.getRestaurantName() != null) {
				updatedTracker.setRestaurantName(t.getRestaurantName());
			}

			updatedTracker.setBill(t.getBill());

			return updatedTracker;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return updatedTracker;
	}

	@Override
	public boolean destroy(int id) {
		Tracker t = null;

		try {
			t = em.find(Tracker.class, id);
			em.remove(t);
			;
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
