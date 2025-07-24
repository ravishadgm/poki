'use client'

import { useEffect, useRef } from 'react'

export const AdSenseTestAd = () => {
  const adRef = useRef(null)

  useEffect(() => {
    try {
      if (adRef.current) {
        const adElement = adRef.current

        // Prevent pushing again if already loaded
        if (!adElement.dataset.adLoaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          adElement.dataset.adLoaded = 'true'
        }
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: '100%', margin: '20px auto' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100px',
        }}
        data-ad-client="ca-pub-3940256099942544"  // ✅ Google test client
        data-ad-slot="6300978111"                 // ✅ Google test slot
        data-adtest="on"
          data-ad-format="auto"                     // ✅ Responsive ads

      />
    </div>
  )
}
