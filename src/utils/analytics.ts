declare global {
    interface Window {
        _hsq: any[];
    }
}

// Initialize the _hsq array if not present
if (typeof window !== 'undefined') {
    window._hsq = window._hsq || [];
}

export const Analytics = {
    /**
     * Tracks a custom event in HubSpot.
     * @param eventId The ID of the event to track (or name for generic analytics)
     * @param value Optional value associated with the event
     */
    trackEvent: (eventId: string, value?: number | string) => {
        if (typeof window !== 'undefined' && window._hsq) {
            window._hsq.push(['trackEvent', {
                id: eventId,
                value: value
            }]);
            console.log(`[Analytics] Event: ${eventId}`, value ? `Value: ${value}` : '');
        }
    },

    /**
     * Manually tracks a page view. Useful for SPA transitions.
     * @param path The path to track (e.g., /input-step)
     */
    trackPageview: (path: string) => {
        if (typeof window !== 'undefined' && window._hsq) {
            window._hsq.push(['setPath', path]);
            window._hsq.push(['trackPageView']);
            console.log(`[Analytics] Pageview: ${path}`);
        }
    },

    /**
     * Identifies the user with an email address.
     * @param email User's email
     */
    identify: (email: string) => {
        if (typeof window !== 'undefined' && window._hsq) {
            window._hsq.push(['identify', {
                email: email
            }]);
            console.log(`[Analytics] Identify: ${email}`);
        }
    }
};
