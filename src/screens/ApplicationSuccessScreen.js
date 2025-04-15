import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ApplicationSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.successIconContainer}>
        <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
      </View>
      
      <Text style={styles.title}>Application Submitted!</Text>
      
      <Text style={styles.message}>
        Your rental application has been successfully submitted. We will review your information and get back to you within 2-3 business days.
      </Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Application Status</Text>
        <View style={styles.statusItem}>
          <View style={styles.statusDot} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusLabel}>Submitted</Text>
            <Text style={styles.statusDate}>April 15, 2025</Text>
          </View>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.inactiveStatusDot]} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.inactiveStatusLabel}>Under Review</Text>
            <Text style={styles.statusDate}>Pending</Text>
          </View>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.inactiveStatusDot]} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.inactiveStatusLabel}>Decision</Text>
            <Text style={styles.statusDate}>Pending</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.contactInfo}>
        If you have any questions, please contact us at:
        support@sphomerental.com or (555) 123-4567
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  successIconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginRight: 12,
    marginTop: 4,
  },
  inactiveStatusDot: {
    backgroundColor: '#e0e0e0',
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  inactiveStatusLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#999',
  },
  statusDate: {
    fontSize: 14,
    color: '#777',
  },
  contactInfo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ApplicationSuccessScreen;
