package com.rtops.shared.events;

public interface Event {
    String getEventType();
    String getAggregateId();
}