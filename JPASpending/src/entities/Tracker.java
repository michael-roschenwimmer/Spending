package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tracker {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="restaurant_name")
	private String restaurantName;
	
	private int bill;

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public int getBill() {
		return bill;
	}

	public void setBill(int bill) {
		this.bill = bill;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Tracker [id=" + id + ", restaurantName=" + restaurantName + ", bill=" + bill + "]";
	}

	
}
