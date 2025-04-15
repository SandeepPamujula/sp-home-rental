import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyCard from '../components/PropertyCard';

// Mock data for property listings
const MOCK_PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    price: 1850,
    address: '123 Main Street, San Francisco, CA 94107',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    isSmartHome: true,
    location: 'San Francisco',
    zipCode: '94107'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    price: 2200,
    address: '456 Park Avenue, New York, NY 10022',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    isSmartHome: false,
    location: 'New York',
    zipCode: '10022'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    price: 1650,
    address: '789 Oak Drive, Austin, TX 78704',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    isSmartHome: true,
    location: 'Austin',
    zipCode: '78704'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    price: 3100,
    address: '101 Lake View, Chicago, IL 60611',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    isSmartHome: true,
    location: 'Chicago',
    zipCode: '60611'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
    price: 1950,
    address: '222 Sunset Blvd, Los Angeles, CA 90046',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    isSmartHome: false,
    location: 'Los Angeles',
    zipCode: '90046'
  }
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [bedroomFilter, setBedroomFilter] = useState(0);
  const [bathroomFilter, setBathroomFilter] = useState(0);
  const [smartHomeOnly, setSmartHomeOnly] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setProperties(MOCK_PROPERTIES);
      return;
    }
    
    const filtered = MOCK_PROPERTIES.filter(property => {
      const locationMatch = property.location.toLowerCase().includes(text.toLowerCase());
      const zipCodeMatch = property.zipCode.includes(text);
      const addressMatch = property.address.toLowerCase().includes(text.toLowerCase());
      
      return locationMatch || zipCodeMatch || addressMatch;
    });
    
    setProperties(filtered);
  };

  const applyFilters = () => {
    let filtered = MOCK_PROPERTIES.filter(property => {
      const priceMatch = property.price >= priceRange.min && property.price <= priceRange.max;
      const bedroomMatch = bedroomFilter === 0 || property.bedrooms >= bedroomFilter;
      const bathroomMatch = bathroomFilter === 0 || property.bathrooms >= bathroomFilter;
      const smartHomeMatch = !smartHomeOnly || property.isSmartHome;
      
      return priceMatch && bedroomMatch && bathroomMatch && smartHomeMatch;
    });
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(property => {
        const locationMatch = property.location.toLowerCase().includes(searchQuery.toLowerCase());
        const zipCodeMatch = property.zipCode.includes(searchQuery);
        const addressMatch = property.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatch || zipCodeMatch || addressMatch;
      });
    }
    
    setProperties(filtered);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setBedroomFilter(0);
    setBathroomFilter(0);
    setSmartHomeOnly(false);
    setProperties(MOCK_PROPERTIES);
    setShowFilters(false);
  };

  const FilterButton = ({ title, value, setValue, options }) => (
    <View style={styles.filterButtonContainer}>
      <Text style={styles.filterLabel}>{title}</Text>
      <View style={styles.filterOptions}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              value === option.value && styles.filterOptionSelected
            ]}
            onPress={() => setValue(option.value)}
          >
            <Text style={[
              styles.filterOptionText,
              value === option.value && styles.filterOptionTextSelected
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location or zipcode"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={20} color="#4a90e2" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>
          
          <FilterButton
            title="Bedrooms"
            value={bedroomFilter}
            setValue={setBedroomFilter}
            options={[
              { label: 'Any', value: 0 },
              { label: '1+', value: 1 },
              { label: '2+', value: 2 },
              { label: '3+', value: 3 },
              { label: '4+', value: 4 }
            ]}
          />
          
          <FilterButton
            title="Bathrooms"
            value={bathroomFilter}
            setValue={setBathroomFilter}
            options={[
              { label: 'Any', value: 0 },
              { label: '1+', value: 1 },
              { label: '2+', value: 2 },
              { label: '3+', value: 3 }
            ]}
          />
          
          <View style={styles.smartHomeFilterContainer}>
            <Text style={styles.filterLabel}>Smart Home Features</Text>
            <TouchableOpacity
              style={styles.smartHomeCheckbox}
              onPress={() => setSmartHomeOnly(!smartHomeOnly)}
            >
              {smartHomeOnly ? (
                <Ionicons name="checkbox" size={24} color="#4a90e2" />
              ) : (
                <Ionicons name="square-outline" size={24} color="#666" />
              )}
              <Text style={styles.smartHomeCheckboxText}>
                Show only smart homes
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={[styles.filterActionButton, styles.resetButton]}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterActionButton, styles.applyButton]}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard 
            property={item} 
            onPress={() => navigation.navigate('PropertyDetail', { property: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="home-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No properties found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterButtonContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#4a90e2',
  },
  filterOptionText: {
    color: '#333',
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  smartHomeFilterContainer: {
    marginBottom: 16,
  },
  smartHomeCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smartHomeCheckboxText: {
    marginLeft: 8,
    fontSize: 16,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  filterActionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  resetButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#4a90e2',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default HomeScreen;
