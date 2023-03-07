const screenshotBtn = document.querySelector("#src-btn"),
screenshotPreview = document.querySelector(".src-preview"),
closeBtn = screenshotPreview.querySelector("#close-btn");

const captureScreen = async () => {
    try {
        // geçerli sekmeyi kaydetmek için bir medya girişi kullanmak için izin istedik
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");
        
        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // videoda ki width & height , canvas width & height olarak yapacağız
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            video.play(); // videoyu oynatıyoruz, böylece çizilen görüntü siyah veya boş olmayacak
            // yakalanan video akışının bir görüntüsünü alacağız
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop(); // akışın ilk video parçasını sonlandırdık
            
            // canva veri url'sini ekran görüntüsü ön izleme kaynağı olarak geçirdik
            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");
        });
        video.srcObject = stream; // yakalama akışı verilerini video kaynak nesnesi olarak geçirdik
    } catch (error) { // görüntü herhangi bir nedenle yakalanamadıysa mesajı uyardık
        alert("Ekran Görüntüsü Alınamadı");
    }
}

closeBtn.addEventListener("click", () => screenshotPreview.classList.toggle("show"));
screenshotBtn.addEventListener("click", captureScreen);