# Google Analytics Setup Guide

## ✅ What's Already Set Up

Your Google Analytics is now configured with:
- **Measurement ID**: `G-EEQE60DDDV`
- **Property**: Ironi Dorot Tiberias
- **React GA4 Integration**: Installed and configured
- **Automatic Page View Tracking**: Enabled
- **Google Tag Manager Script**: Added to HTML

## 📊 What You Can Track

### 1. **Page Views** (Automatic)
- Every page visit is automatically tracked
- Includes page path and search parameters
- Works with your React Router navigation

### 2. **Custom Events** (Manual)
You can track specific user interactions like:
- Button clicks
- Form submissions
- Video plays
- Social media clicks
- Login/logout events

## 🔧 How to Add Custom Event Tracking

### Example: Track Button Clicks

```tsx
import { logEvent } from '@/lib/analytics';

// In your component
const handleButtonClick = () => {
  // Track the event
  logEvent('click', 'button', 'subscription_button');
  
  // Your existing logic
  window.open('https://www.go-out.co/event/1749454502160', '_blank');
};

<Button onClick={handleButtonClick}>לרכישת מנוי</Button>
```

### Example: Track Social Media Clicks

```tsx
const handleSocialClick = (platform: string) => {
  logEvent('click', 'social_media', platform);
};

<a 
  href="https://www.facebook.com/groupdorot" 
  target="_blank" 
  rel="noopener noreferrer"
  onClick={() => handleSocialClick('facebook')}
>
  <img src={dorotLogo} alt="Dorot Group" />
</a>
```

### Example: Track Video Plays

```tsx
const handleVideoPlay = (videoId: string, videoTitle: string) => {
  logEvent('play', 'video', videoTitle, undefined);
};

<video onPlay={() => handleVideoPlay('video-123', 'Match Highlights')}>
  {/* video content */}
</video>
```

## 📈 Viewing Your Analytics

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Select your property**: Ironi Dorot Tiberias
3. **Check these reports**:
   - **Realtime**: See current visitors
   - **Reports > Engagement > Pages and screens**: See most visited pages
   - **Reports > Acquisition > Traffic acquisition**: See where visitors come from
   - **Reports > Engagement > Events**: See custom events

## 🚀 Next Steps

1. **Deploy your website** to see data flowing
2. **Wait 24-48 hours** for data to appear
3. **Set up goals** in Google Analytics for important actions
4. **Create custom reports** for specific insights

## 🔍 Testing Your Setup

1. **Open your website** in a browser
2. **Open Developer Tools** (F12)
3. **Go to Network tab**
4. **Look for requests to** `google-analytics.com` or `googletagmanager.com`
5. **Check Console** for any GA-related errors

## 📱 Mobile App Tracking (Future)

If you plan to create a mobile app, you can use:
- **Firebase Analytics** (recommended for mobile apps)
- **Google Analytics for Firebase**

## 🛠️ Available Functions

```tsx
// Track page views (automatic)
logPageView('/club');

// Track custom events
logEvent('click', 'button', 'subscribe', 1);

// Track errors
logException('Payment failed', false);
```

## 📞 Need Help?

- **Google Analytics Help**: https://support.google.com/analytics/
- **React GA4 Documentation**: https://github.com/PriceRunner/react-ga4
- **GA4 Events Reference**: https://developers.google.com/analytics/devguides/collection/ga4/events

## 🔒 Privacy Considerations

- Ensure your privacy policy mentions Google Analytics
- Consider adding a cookie consent banner
- Respect user privacy settings
- Don't track personally identifiable information (PII) 