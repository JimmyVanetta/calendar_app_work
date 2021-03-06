//import Vue from 'vue'
import { seedData } from './seed.js'

export const store = {
    state: {
        seedData
    },
    // DAY //
    getActiveDay() {
        return this.state.seedData.find((day) => day.active)
    },
    setActiveDay(dayId) {
        this.state.seedData.map((dayObj) => { dayObj.id === dayId ? dayObj.active = true : dayObj.active = false })
    }, 
    // EVENT //
    submitEvent(eventDetails) {
        const activeDay = this.getActiveDay()
        activeDay.events.push({ "details": eventDetails, "edit": false })
    },
    editEvent(dayId,eventDetails) {
        this.resetEditOfAllEvents()
        const eventObj = this.getEventObj(dayId, eventDetails)
        eventObj.edit = true
    },
    updateEvent(dayId, originalEventDetails, newEventDetails) {
        const eventObj = this.getEventObj(dayId, originalEventDetails)
        eventObj.details = newEventDetails
        eventObj.edit = false
    },
    deleteEvent(dayId, eventDetails) {
        const dayObj = this.getDayObj(dayId)
        const eventIndexToRemove = dayObj.events.findIndex(event => event.details === eventDetails)
        dayObj.events.splice(eventIndexToRemove, 1)
    },
    resetEditOfAllEvents() {
        this.state.seedData.map((dayObj) => dayObj.events.map((event) => event.edit = false))
    },
    // HELPERS //
    getDayObj(dayId) {
        return this.state.seedData.find(day => day.id === dayId)
    }, 
    getEventObj(dayId, eventDetails) {
        const dayObj = this.state.seedData.find(day => day.id === dayId)
        return dayObj.events.find(event => event.details === eventDetails)
    }
}