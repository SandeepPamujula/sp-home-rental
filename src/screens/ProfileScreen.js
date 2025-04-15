import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  // User state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '(555) 123-4567',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  });
  
  // Communication preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    marketingEmails: false
  });
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});
  
  const handleTogglePreference = (preference) => {
    setPreferences({
      ...preferences,
      [preference]: !preferences[preference]
    });
  };
  
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    // In a real app, this would handle the logout process
    alert('Logged out successfully');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: user.profileImage }} 
            style={styles.profileImage} 
          />
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.profileInfo}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={editedUser.name}
              onChangeText={(text) => setEditedUser({...editedUser, name: text})}
            />
          ) : (
            <Text style={styles.name}>{user.name}</Text>
          )}
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={22} color="#666" style={styles.infoIcon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedUser.email}
                onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{user.email}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={22} color="#666" style={styles.infoIcon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedUser.phone}
                onChangeText={(text) => setEditedUser({...editedUser, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{user.phone}</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.passwordButton}>
          <Ionicons name="lock-closed-outline" size={22} color="#4a90e2" style={styles.passwordIcon} />
          <Text style={styles.passwordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Communication Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Email Notifications</Text>
            <Text style={styles.preferenceDescription}>Receive updates about your application and rental</Text>
          </View>
          <Switch
            value={preferences.emailNotifications}
            onValueChange={() => handleTogglePreference('emailNotifications')}
            trackColor={{ false: "#d1d1d1", true: "#4a90e2" }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>SMS Notifications</Text>
            <Text style={styles.preferenceDescription}>Receive text messages for important updates</Text>
          </View>
          <Switch
            value={preferences.smsNotifications}
            onValueChange={() => handleTogglePreference('smsNotifications')}
            trackColor={{ false: "#d1d1d1", true: "#4a90e2" }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Push Notifications</Text>
            <Text style={styles.preferenceDescription}>Receive alerts directly on your device</Text>
          </View>
          <Switch
            value={preferences.pushNotifications}
            onValueChange={() => handleTogglePreference('pushNotifications')}
            trackColor={{ false: "#d1d1d1", true: "#4a90e2" }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Marketing Emails</Text>
            <Text style={styles.preferenceDescription}>Receive promotional offers and newsletters</Text>
          </View>
          <Switch
            value={preferences.marketingEmails}
            onValueChange={() => handleTogglePreference('marketingEmails')}
            trackColor={{ false: "#d1d1d1", true: "#4a90e2" }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.accountButton}>
          <Ionicons name="help-circle-outline" size={22} color="#666" style={styles.accountButtonIcon} />
          <Text style={styles.accountButtonText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.accountButton}>
          <Ionicons name="document-text-outline" size={22} color="#666" style={styles.accountButtonIcon} />
          <Text style={styles.accountButtonText}>Terms & Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.accountButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" style={styles.accountButtonIcon} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>SP-Home-Rental v1.0.0</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4a90e2',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4a90e2',
    paddingBottom: 4,
  },
  editButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
  },
  infoInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4a90e2',
    paddingBottom: 4,
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  passwordIcon: {
    marginRight: 16,
  },
  passwordButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: '500',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#666',
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accountButtonIcon: {
    marginRight: 16,
  },
  accountButtonText: {
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;
