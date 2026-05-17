# Daily Journal - Test Plan

## Overview
This document outlines the testing checklist for all interactive features in the Daily Journal application.

## Test Environment
- Development server running at: http://localhost:5173/
- Data storage: localStorage
- Browser: Any modern browser with localStorage support

## Features to Test

### 1. Navigation
- [ ] All navigation items work correctly (Home, Journal, Calendar, Habits, Exercise)
- [ ] Active page is highlighted in navigation
- [ ] Mobile bottom navigation works correctly
- [ ] Logo link returns to home page

### 2. Home Page
- [ ] Stats display correctly (Journal entries, Calendar events, Habits, Exercises)
- [ ] Recent journal entries are displayed
- [ ] Today's events are shown
- [ ] Top habit streaks are visible
- [ ] Recent workouts are listed
- [ ] All "View All" buttons navigate to correct pages
- [ ] "Write Entry" and "Track Habits" buttons work

**KNOWN ISSUE**: Home page uses static data imports instead of hooks, so it won't update when localStorage changes

### 3. Journal Page - CRUD Operations
#### Create
- [ ] Click "+ Write New Entry" button
- [ ] Fill in all fields (Date, Mood, Title, Content, Tags)
- [ ] Submit the form
- [ ] New entry appears in the sidebar
- [ ] Entry is saved to localStorage

#### Read
- [ ] Entries are listed in the sidebar
- [ ] Click on an entry to view details
- [ ] Entry details display correctly (title, content, mood, tags, date)
- [ ] Search functionality filters entries by title, content, or tags

#### Update
- [ ] Click "Edit" button on a selected entry
- [ ] Form loads with existing data
- [ ] Modify fields
- [ ] Click "Update Entry"
- [ ] Changes are reflected in the entry
- [ ] Changes persist in localStorage

#### Delete
- [ ] Click "Delete" button on an entry
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Entry is removed from the list
- [ ] Entry is removed from localStorage

### 4. Calendar Page - CRUD Operations
#### Create
- [ ] Click "+ Add Event" button
- [ ] Fill in all fields (Title, Date, Time range, Category, Description)
- [ ] Submit the form
- [ ] New event appears in the calendar
- [ ] Event is saved to localStorage

#### Read
- [ ] Events are grouped by date in sidebar
- [ ] Select a date to view events for that day
- [ ] Events display with correct time, category icon, and color
- [ ] Filter by category works correctly
- [ ] "All Upcoming Events" section shows events

#### Update
- [ ] Click "Edit" button on an event
- [ ] Form loads with existing data
- [ ] Modify fields
- [ ] Click "Update Event"
- [ ] Changes are reflected in the event
- [ ] Changes persist in localStorage

#### Delete
- [ ] Click "Delete" button on an event
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Event is removed from the list
- [ ] Event is removed from localStorage

### 5. Habits Page - CRUD Operations
#### Create
- [ ] Click "+ Add Habit" button
- [ ] Fill in all fields (Name, Icon, Description, Category, Frequency)
- [ ] Submit the form
- [ ] New habit appears in the grid
- [ ] Habit is saved to localStorage with streak=0 and empty completedDates

#### Read
- [ ] Habits display in a grid with cards
- [ ] Each card shows: icon, name, description, category, frequency, streak, completions
- [ ] Stats cards show: Total Habits, Active Streaks, Longest Streak, Total Completions
- [ ] Filter by category works correctly
- [ ] Filter by frequency works correctly
- [ ] Habits are sorted by streak (highest first)

#### Update
- [ ] Click "Edit" button on a habit card
- [ ] Form loads with existing data
- [ ] Modify fields
- [ ] Click "Update Habit"
- [ ] Changes are reflected in the habit card
- [ ] Changes persist in localStorage

#### Delete
- [ ] Click "Delete" button on a habit card
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Habit is removed from the grid
- [ ] Habit is removed from localStorage

#### Complete Habit
- [ ] Click "✓ Complete" button on a habit card
- [ ] Button changes to "✓ Done Today" and becomes disabled
- [ ] Streak count increases by 1
- [ ] Today's date is added to completedDates array
- [ ] Total completions count increases in stats
- [ ] Changes persist in localStorage
- [ ] Attempting to complete again shows alert "You've already completed this habit today!"

### 6. Exercise Page - CRUD Operations
#### Create
- [ ] Click "+ Add" button
- [ ] Fill in all fields (Name, Date, Type, Duration, optional: Calories, Distance, Sets, Reps, Weight, Notes)
- [ ] Submit the form
- [ ] New exercise appears in the sidebar list
- [ ] Exercise is saved to localStorage
- [ ] Stats update correctly (Total Workouts, Total Time, Calories Burned, Distance)

#### Read
- [ ] Exercises are listed in sidebar, sorted by date (newest first)
- [ ] Click on an exercise to view details
- [ ] Exercise details display correctly
- [ ] Filter by type works (All, Cardio, Strength, Flexibility, Sports)
- [ ] Stats display correctly at the top

#### Update
- [ ] Click "Edit" button on a selected exercise
- [ ] Form loads with existing data
- [ ] Modify fields
- [ ] Click "Update Exercise"
- [ ] Changes are reflected in the exercise
- [ ] Changes persist in localStorage
- [ ] Stats update if values changed

#### Delete
- [ ] Click "Delete" button on an exercise
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Exercise is removed from the list
- [ ] Exercise is removed from localStorage
- [ ] Stats update correctly

### 7. Data Persistence
- [ ] Create entries in each section (Journal, Calendar, Habits, Exercise)
- [ ] Refresh the page
- [ ] All data persists correctly
- [ ] Navigate between pages - data remains consistent

### 8. Form Validation
- [ ] Required fields show validation errors when empty
- [ ] Date fields accept valid dates
- [ ] Time fields accept valid times
- [ ] Number fields accept valid numbers
- [ ] Cancel buttons work correctly and reset forms

### 9. UI/UX
- [ ] All buttons have hover effects
- [ ] Loading spinners appear when data is loading
- [ ] Empty states display correctly (no entries, no habits, etc.)
- [ ] Confirmation dialogs prevent accidental deletions
- [ ] Forms clear after successful submission
- [ ] Mobile responsiveness works correctly

## Issues Found

### Critical Issues
1. **Home page static data**: Home page reads from static data files instead of using hooks, so statistics and recent items won't update when user makes changes via localStorage

### Minor Issues
None identified yet (will update during testing)

## Test Results
- Test Date: [To be filled]
- Tester: [To be filled]
- Browser: [To be filled]
- Overall Status: [To be filled]
