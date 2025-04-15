import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Switch,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Step indicators component
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.stepIndicatorContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.stepDot,
            index === currentStep ? styles.currentStepDot : 
            index < currentStep ? styles.completedStepDot : {}
          ]}
        />
      ))}
    </View>
  );
};

// Document upload component
const DocumentUpload = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.documentUploadContainer} onPress={onPress}>
      <View style={styles.documentIconContainer}>
        <Ionicons name="document-outline" size={30} color="#4a90e2" />
      </View>
      <View style={styles.documentTextContainer}>
        <Text style={styles.documentTitle}>{title}</Text>
        <Text style={styles.documentDescription}>{description}</Text>
      </View>
      <Ionicons name="cloud-upload-outline" size={24} color="#4a90e2" />
    </TouchableOpacity>
  );
};

const ApplicationScreen = ({ route, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  
  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    ssn: ''
  });
  
  const [employmentInfo, setEmploymentInfo] = useState({
    employer: '',
    position: '',
    income: '',
    employmentLength: '',
    supervisorName: '',
    supervisorPhone: ''
  });
  
  const [rentalHistory, setRentalHistory] = useState({
    currentAddress: '',
    currentLandlord: '',
    currentLandlordPhone: '',
    lengthOfStay: '',
    reasonForLeaving: ''
  });
  
  const [documents, setDocuments] = useState({
    idUploaded: false,
    proofOfIncomeUploaded: false,
    creditReportUploaded: false
  });
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Property info from navigation params or default
  const property = route.params?.property || {
    id: '1',
    address: '123 Main Street, San Francisco, CA 94107',
    price: 1850
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit application
      navigation.navigate('ApplicationSuccess');
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle document upload
  const handleDocumentUpload = (documentType) => {
    // In a real app, this would open a document picker
    // For this demo, we'll just mark it as uploaded
    setDocuments({
      ...documents,
      [documentType]: true
    });
  };
  
  // Handle payment
  const handlePayment = () => {
    // In a real app, this would integrate with a payment processor
    // For this demo, we'll just mark it as complete
    setPaymentComplete(true);
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={personalInfo.firstName}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, firstName: text})}
                  placeholder="John"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={personalInfo.lastName}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, lastName: text})}
                  placeholder="Doe"
                />
              </View>
            </View>
            
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.email}
              onChangeText={(text) => setPersonalInfo({...personalInfo, email: text})}
              placeholder="johndoe@example.com"
              keyboardType="email-address"
            />
            
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.phone}
              onChangeText={(text) => setPersonalInfo({...personalInfo, phone: text})}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
            />
            
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.dob}
              onChangeText={(text) => setPersonalInfo({...personalInfo, dob: text})}
              placeholder="MM/DD/YYYY"
            />
            
            <Text style={styles.inputLabel}>Social Security Number</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.ssn}
              onChangeText={(text) => setPersonalInfo({...personalInfo, ssn: text})}
              placeholder="XXX-XX-XXXX"
              secureTextEntry
            />
          </View>
        );
      
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Employment & Income</Text>
            
            <Text style={styles.inputLabel}>Current Employer</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.employer}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, employer: text})}
              placeholder="Company Name"
            />
            
            <Text style={styles.inputLabel}>Position/Title</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.position}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, position: text})}
              placeholder="Software Engineer"
            />
            
            <Text style={styles.inputLabel}>Monthly Income ($)</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.income}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, income: text})}
              placeholder="5000"
              keyboardType="numeric"
            />
            
            <Text style={styles.inputLabel}>Length of Employment</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.employmentLength}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, employmentLength: text})}
              placeholder="2 years"
            />
            
            <Text style={styles.inputLabel}>Supervisor Name</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.supervisorName}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, supervisorName: text})}
              placeholder="Jane Smith"
            />
            
            <Text style={styles.inputLabel}>Supervisor Phone</Text>
            <TextInput
              style={styles.input}
              value={employmentInfo.supervisorPhone}
              onChangeText={(text) => setEmploymentInfo({...employmentInfo, supervisorPhone: text})}
              placeholder="(555) 987-6543"
              keyboardType="phone-pad"
            />
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Document Verification</Text>
            <Text style={styles.stepDescription}>
              Please upload the following documents to verify your identity and income.
            </Text>
            
            <DocumentUpload
              title="Government-issued ID"
              description={documents.idUploaded ? "Uploaded" : "Driver's license, passport, or state ID"}
              onPress={() => handleDocumentUpload('idUploaded')}
            />
            
            <DocumentUpload
              title="Proof of Income"
              description={documents.proofOfIncomeUploaded ? "Uploaded" : "Recent pay stubs or tax returns"}
              onPress={() => handleDocumentUpload('proofOfIncomeUploaded')}
            />
            
            <DocumentUpload
              title="Credit Report Authorization"
              description={documents.creditReportUploaded ? "Uploaded" : "Authorization form for credit check"}
              onPress={() => handleDocumentUpload('creditReportUploaded')}
            />
            
            <View style={styles.termsContainer}>
              <Switch
                value={agreeToTerms}
                onValueChange={setAgreeToTerms}
                trackColor={{ false: "#d1d1d1", true: "#4a90e2" }}
                thumbColor="#fff"
              />
              <Text style={styles.termsText}>
                I authorize a background and credit check and certify that all information provided is accurate.
              </Text>
            </View>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Application Fee</Text>
            <Text style={styles.stepDescription}>
              A $50 non-refundable application fee is required to process your application.
            </Text>
            
            <View style={styles.propertyInfoContainer}>
              <Text style={styles.propertyInfoTitle}>Application Summary</Text>
              <Text style={styles.propertyAddress}>{property.address}</Text>
              <Text style={styles.propertyPrice}>${property.price}/month</Text>
              
              <View style={styles.feeContainer}>
                <Text style={styles.feeLabel}>Application Fee:</Text>
                <Text style={styles.feeAmount}>$50.00</Text>
              </View>
              
              <View style={styles.feeContainer}>
                <Text style={styles.feeLabel}>Total Due Now:</Text>
                <Text style={styles.feeTotalAmount}>$50.00</Text>
              </View>
            </View>
            
            {!paymentComplete ? (
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodTitle}>Payment Method</Text>
                
                <TouchableOpacity 
                  style={styles.paymentButton}
                  onPress={handlePayment}
                >
                  <Ionicons name="card-outline" size={24} color="#fff" />
                  <Text style={styles.paymentButtonText}>Pay with Credit Card</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.paymentCompleteContainer}>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                <Text style={styles.paymentCompleteText}>Payment Complete</Text>
                <Text style={styles.paymentCompleteSubtext}>
                  Your application fee has been processed successfully.
                </Text>
              </View>
            )}
          </View>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rental Application</Text>
        <Text style={styles.headerSubtitle}>
          {property.address}
        </Text>
      </View>
      
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      {renderStepContent()}
      
      <View style={styles.navigationButtons}>
        {currentStep > 0 && (
          <TouchableOpacity 
            style={[styles.navButton, styles.backButton]}
            onPress={handlePrevStep}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.navButton, 
            styles.nextButton,
            (currentStep === 3 && !paymentComplete) && styles.disabledButton
          ]}
          onPress={handleNextStep}
          disabled={currentStep === 3 && !paymentComplete}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps - 1 ? 'Submit Application' : 'Next'}
          </Text>
        </TouchableOpacity>
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
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  currentStepDot: {
    backgroundColor: '#4a90e2',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  completedStepDot: {
    backgroundColor: '#4CAF50',
  },
  stepContent: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  documentUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f0fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTextContainer: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  termsText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  propertyInfoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  propertyInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  propertyAddress: {
    fontSize: 16,
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 16,
    color: '#666',
  },
  feeAmount: {
    fontSize: 16,
  },
  feeTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    marginBottom: 16,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  paymentCompleteContainer: {
    alignItems: 'center',
    padding: 16,
  },
  paymentCompleteText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paymentCompleteSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  navButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginRight: 8,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    flex: 2,
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#b0b0b0',
  },
});

export default ApplicationScreen;
