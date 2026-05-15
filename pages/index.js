import { useState, useEffect } from 'react';
import CharacterGenerator from '../components/CharacterGenerator';
import RarityDisplay from '../components/RarityDisplay';
import DeviceCheck from '../components/DeviceCheck';

export default function Home() {
  const [canGenerate, setCanGenerate] = useState(false);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDeviceEligibility();
  }, []);

  const checkDeviceEligibility = async () => {
    try {
      const response = await fetch('/api/check-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fingerprint: await getDeviceFingerprint() 
        }),
      });
      const data = await response.json();
      setCanGenerate(data.canGenerate);
      if (data.existingCharacter) {
        setCharacter(data.existingCharacter);
      }
    } catch (error) {
      console.error('Error checking device:', error);
    }
    setLoading(false);
  };

  const getDeviceFingerprint = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    return btoa(JSON.stringify({
      canvas: canvas.toDataURL(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone:
