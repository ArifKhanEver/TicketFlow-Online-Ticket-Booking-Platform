'use client';

import React from 'react';
import TicketFlowLoader from '@/Components/shared/TicketFlowLoader';

export default function Loading() {
    return (
        <TicketFlowLoader
            variant="fullscreen"
            themeColor="default"
            showTelemetry={true}
            showProgressBar={true}
        />
    );
}