package test;
import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Tracker;

public class TrackerTest {
	
	private EntityManager em = null;

	@Before
	public void setup() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Spending");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() {
		if (em != null) {
			em.close();
		}
	}
	
	@Test
	public void test() {
		boolean pass = true;
		assertEquals(pass, true);
	}
	
	@Test
	public void test_quiz_has_names() {
		String restaurantName = "Beau Jos";
		assertEquals(em.find(Tracker.class, 1).getRestaurantName(), restaurantName);
	}
}
