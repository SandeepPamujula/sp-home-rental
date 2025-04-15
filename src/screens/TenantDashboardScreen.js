import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dashboard Card Component
const DashboardCard = ({ title, icon, children, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color="#4a90e2" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

// Payment Method Card Component
const PaymentMethodCard = ({ type, last4, expiry, selected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[styles.paymentMethodCard, selected && styles.selectedPaymentMethod]} 
      onPress={onSelect}
    >
      <View style={styles.paymentMethodIcon}>
        <Ionicons 
          name={type === 'visa' ? 'card' : type === 'bank' ? 'business' : 'cash'} 
          size={24} 
          color="#4a90e2" 
        />
      </View>
      <View style={styles.paymentMethodDetails}>
        <Text style={styles.paymentMethodTitle}>
          {type === 'visa' ? 'Visa' : type === 'bank' ? 'Bank Account' : 'Other'}
        </Text>
        <Text style={styles.paymentMethodInfo}>
          {type === 'visa' ? `•••• ${last4} | Exp: ${expiry}` : `•••• ${last4}`}
        </Text>
      </View>
      {selected && (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );
};

const TenantDashboardScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [maintenanceTitle, setMaintenanceTitle] = useState('');
  const [maintenanceDescription, setMaintenanceDescription] = useState('');
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  
  // Mock data
  const property = {
    address: '123 Main Street, San Francisco, CA 94107',
    rent: 1850,
    dueDate: '05/01/2025',
    leaseEnd: '12/31/2025'
  };
  
  const paymentHistory = [
    { id: '1', date: '04/01/2025', amount: 1850, status: 'Paid' },
    { id: '2', date: '03/01/2025', amount: 1850, status: 'Paid' },
    { id: '3', date: '02/01/2025', amount: 1850, status: 'Paid' },
    { id: '4', date: '01/01/2025', amount: 1850, status: 'Paid' }
  ];
  
  const maintenanceRequests = [
    { 
      id: '1', 
      title: 'Leaking Faucet', 
      date: '03/15/2025', 
      status: 'In Progress',
      statusColor: '#FF9800'
    },
    { 
      id: '2', 
      title: 'Broken Light Fixture', 
      date: '02/20/2025', 
      status: 'Completed',
      statusColor: '#4CAF50'
    }
  ];
  
  const handlePayRent = () => {
    // In a real app, this would process the payment
    alert('Rent payment processed successfully!');
  };
  
  const handleSubmitMaintenance = () => {
    // In a real app, this would submit the maintenance request
    alert('Maintenance request submitted successfully!');
    setShowMaintenanceForm(false);
    setMaintenanceTitle('');
    setMaintenanceDescription('');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tenant Dashboard</Text>
        <Text style={styles.headerSubtitle}>{property.address}</Text>
      </View>
      
      <View style={styles.dashboardContainer}>
        {/* Rent Payment Card */}
        <DashboardCard 
          title="Rent Payment" 
          icon="cash-outline"
          onPress={() => {}}
        >
          <View style={styles.rentInfo}>
            <View>
              <Text style={styles.rentAmount}>${property.rent}</Text>
              <Text style={styles.rentDueDate}>Due on {property.dueDate}</Text>
            </View>
            <TouchableOpacity 
              style={styles.payNowButton}
              onPress={handlePayRent}
            >
              <Text style={styles.payNowButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.paymentMethodsTitle}>Payment Methods</Text>
          
          <PaymentMethodCard
            type="visa"
            last4="4242"
            expiry="09/26"
            selected={selectedPaymentMethod === 'visa'}
            onSelect={() => setSelectedPaymentMethod('visa')}
          />
          
          <PaymentMethodCard
            type="bank"
            last4="9876"
            selected={selectedPaymentMethod === 'bank'}
            onSelect={() => setSelectedPaymentMethod('bank')}
          />
          
          <TouchableOpacity style={styles.addPaymentMethod}>
            <Ionicons name="add-circle-outline" size={20} color="#4a90e2" />
            <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </DashboardCard>
        
        {/* Maintenance Requests Card */}
        <DashboardCard 
          title="Maintenance Requests" 
          icon="construct-outline"
          onPress={() => {}}
        >
          {maintenanceRequests.map(request => (
            <View key={request.id} style={styles.maintenanceItem}>
              <View style={styles.maintenanceInfo}>
                <Text style={styles.maintenanceTitle}>{request.title}</Text>
                <Text style={styles.maintenanceDate}>Submitted: {request.date}</Text>
              </View>
              <View style={[styles.maintenanceStatus, { backgroundColor: request.statusColor }]}>
                <Text style={styles.maintenanceStatusText}>{request.status}</Text>
              </View>
            </View>
          ))}
          
          {showMaintenanceForm ? (
            <View style={styles.maintenanceForm}>
              <Text style={styles.maintenanceFormTitle}>New Maintenance Request</Text>
              
              <Text style={styles.inputLabel}>Issue Title</Text>
              <TextInput
                style={styles.input}
                value={maintenanceTitle}
                onChangeText={setMaintenanceTitle}
                placeholder="e.g., Broken Dishwasher"
              />
              
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={maintenanceDescription}
                onChangeText={setMaintenanceDescription}
                placeholder="Please describe the issue in detail..."
                multiline
                numberOfLines={4}
              />
              
              <View style={styles.formButtons}>
                <TouchableOpacity 
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => setShowMaintenanceForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.formButton, styles.submitButton]}
                  onPress={handleSubmitMaintenance}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.newRequestButton}
              onPress={() => setShowMaintenanceForm(true)}
            >
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.newRequestButtonText}>New Request</Text>
            </TouchableOpacity>
          )}
        </DashboardCard>
        
        {/* Payment History Card */}
        <DashboardCard 
          title="Payment History" 
          icon="calendar-outline"
          onPress={() => {}}
        >
          <View style={styles.paymentHistoryHeader}>
            <Text style={styles.paymentHistoryHeaderText}>Date</Text>
            <Text style={styles.paymentHistoryHeaderText}>Amount</Text>
            <Text style={styles.paymentHistoryHeaderText}>Status</Text>
          </View>
          
          {paymentHistory.map(payment => (
            <View key={payment.id} style={styles.paymentHistoryItem}>
              <Text style={styles.paymentHistoryDate}>{payment.date}</Text>
              <Text style={styles.paymentHistoryAmount}>${payment.amount}</Text>
              <View style={[
                styles.paymentHistoryStatus, 
                payment.status === 'Paid' ? styles.paidStatus : {}
              ]}>
                <Text style={styles.paymentHistoryStatusText}>{payment.status}</Text>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All History</Text>
          </TouchableOpacity>
        </DashboardCard>
        
        {/* Lease Information Card */}
        <DashboardCard 
          title="Lease Information" 
          icon="document-text-outline"
          onPress={() => {}}
        >
          <View style={styles.leaseInfoItem}>
            <Text style={styles.leaseInfoLabel}>Property Address:</Text>
            <Text style={styles.leaseInfoValue}>{property.address}</Text>
          </View>
          
          <View style={styles.leaseInfoItem}>
            <Text style={styles.leaseInfoLabel}>Monthly Rent:</Text>
            <Text style={styles.leaseInfoValue}>${property.rent}</Text>
          </View>
          
          <View style={styles.leaseInfoItem}>
            <Text style={styles.leaseInfoLabel}>Lease End Date:</Text>
            <Text style={styles.leaseInfoValue}>{property.leaseEnd}</Text>
          </View>
          
          <TouchableOpacity style={styles.viewLeaseButton}>
            <Ionicons name="document-outline" size={18} color="#4a90e2" />
            <Text style={styles.viewLeaseButtonText}>View Lease Agreement</Text>
          </TouchableOpacity>
        </DashboardCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  dashboardContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  cardContent: {
    padding: 16,
  },
  rentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rentDueDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  payNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethodsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedPaymentMethod: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0fff0',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentMethodInfo: {
    fontSize: 14,
    color: '#666',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addPaymentMethodText: {
    color: '#4a90e2',
    fontSize: 16,
    marginLeft: 8,
  },
  maintenanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenanceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  maintenanceDate: {
    fontSize: 14,
    color: '#666',
  },
  maintenanceStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  maintenanceStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newRequestButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  newRequestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  maintenanceForm: {
    marginTop: 16,
  },
  maintenanceFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    marginLeft: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 8,
  },
  paymentHistoryHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    flex: 1,
  },
  paymentHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentHistoryDate: {
    fontSize: 14,
    flex: 1,
  },
  paymentHistoryAmount: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  paymentHistoryStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    maxWidth: 80,
  },
  paidStatus: {
    backgroundColor: '#e6f7e6',
  },
  paymentHistoryStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllButtonText: {
    color: '#4a90e2',
    fontSize: 16,
  },
  leaseInfoItem: {
    marginBottom: 12,
  },
  leaseInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  leaseInfoValue: {
    fontSize: 16,
  },
  viewLeaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4a90e2',
    borderRadius: 8,
  },
  viewLeaseButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default TenantDashboardScreen;
