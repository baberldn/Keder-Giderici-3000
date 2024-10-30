import './styles.css';
import Header from './components/Header';
import ActivityCard from './components/ActivityCard';
import { useState, useEffect } from 'react';

export default function App() {
   /* Challenge

    Kullanıcının etkinlikleri Bored API için key olarak kaydedildi. Göreviniz, etkinlik verilerini almak için key'leri aşağıdaki gibi kullanmaktır: 
    
        1. Sayfa yüklendiğinde, aşağıdaki savedActivityKeys array'inde bulunan 20 key'in her biri için Bored API'den aktivite verileri alınmalıdır. Bu veri getirme işlemlerinin nasıl yapılacağını öğrenmek için API_Documentation.md dosyasını okuyun. 
        
        2. Veriler, activities state array'e 20 JavaScript nesnesi (her key/response/activity için bir tane) olarak kaydedilmelidir.  
           
        3. Şu anda activitiesData state olarak ayarlanmış olan placeHolderData'dan kurtulun. Bu veri sadece size gerçek verinin içeriği, biçimi ve faydası hakkında bir fikir vermek içindir. Sonunda, üzerinde API'den gerçek veriler bulunan 20 etkinlik kartı elde etmelisiniz. 
        
    Not: Tek yapmanız gereken activitiesData state'ini yukarıda açıklanan şekilde ayarlamaktır. Bunu doğru bir şekilde yaparsanız, aşağıdaki 33. satırda yer alan activityCardElements değişkeni etkinlik kartlarını sizin için oluşturacaktır. 
*/
  const savedActivityKeys = [
    8364626, 4688012, 6553978, 3699502, 9908721,
    3136729, 5490351, 8827573, 9318514, 1668223
  ];

  const [activitiesData, setActivitiesData] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityRequests = savedActivityKeys.map(key =>
          fetch(`https://bored.api.lewagon.com/api/activity`).then(res => res.json())
        );

        const activities = await Promise.all(activityRequests);
        setActivitiesData(activities);
      } catch (error) {
        // console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const activityCardElements = activitiesData.map((activityData, index) => (
    <ActivityCard key={index} number={index + 1} {...activityData} />
  ));

  return (
    <div className='wrapper'>
      <Header />
      <div className='container'>{activityCardElements}</div>
    </div>
  );
}
