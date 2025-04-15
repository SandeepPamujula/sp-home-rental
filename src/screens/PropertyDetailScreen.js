import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : {}
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const PropertyDetailScreen = ({ route }) => {
  const { property } = route.params || {
    id: '1',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    ],
    price: 1850,
    address: '123 Main Street, San Francisco, CA 94107',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    isSmartHome: true,
    description: 'Beautiful modern apartment in the heart of San Francisco. Recently renovated with high-end finishes and smart home features throughout. Open floor plan with lots of natural light.',
    amenities: [
      'In-unit Laundry',
      'Dishwasher',
      'Central AC',
      'Hardwood Floors',
      'Stainless Steel Appliances',
      'Balcony',
      'Fitness Center',
      'Parking',
      'Pet Friendly'
    ],
    smartFeatures: [
      'Smart Thermostat',
      'Smart Locks',
      'Voice-controlled Lighting',
      'Smart Appliances',
      'Security Cameras'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'
  };

  // Ensure property has an images array
  const propertyImages = property.images || [property.image];

  return (
    <ScrollView style={styles.container}>
      <ImageCarousel images={propertyImages} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>${property.price}/month</Text>
        <Text style={styles.address}>{property.address}</Text>
        
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Ionicons name="bed-outline" size={20} color="#666" />
            <Text style={styles.featureText}>{property.bedrooms} beds</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={20} color="#666" />
            <Text style={styles.featureText}>{property.bathrooms} baths</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="resize-outline" size={20} color="#666" />
            <Text style={styles.featureText}>{property.sqft} sqft</Text>
          </View>
        </View>
        
        {property.isSmartHome && (
          <View style={styles.smartHomeTag}>
            <Ionicons name="flash-outline" size={16} color="#fff" />
            <Text style={styles.smartHomeText}>Smart Home</Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{property.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Floor Plan</Text>
          <Image 
            source={{ uri: property.floorPlan }} 
            style={styles.floorPlan}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {property.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#4a90e2" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {property.isSmartHome && property.smartFeatures && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Smart Home Features</Text>
            <View style={styles.amenitiesContainer}>
              {property.smartFeatures.map((feature, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="flash-outline" size={18} color="#4a90e2" />
                  <Text style={styles.amenityText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 300,
    width: '100%',
  },
  carouselImage: {
    width,
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  featureText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#666',
  },
  smartHomeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  smartHomeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  floorPlan: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#444',
  },
  applyButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PropertyDetailScreen;
