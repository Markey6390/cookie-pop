<script setup>

</script>
<template>
    <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-[30px]">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">餅乾蹦 Cookie Pop!</h2>
        <p class="text-gray-700 text-lg">餅乾蹦 Cookie Pop! 是一個用於快速生成 Cookie 告知 (Cookie Consent)
            的工具，您將透過介面操作來制定您偏好的樣式以及內容，最後您可以直接取得程式碼，並將其用在您的網站上。</p>
    </div>

    <div class="font-sans text-gray-800 leading-relaxed pb-[300px]">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">網站為什麼需要 cookie 告知？</h2>
        <p class="mb-4">網站需要顯示 Cookie 告知的主要原因是法律合規，以及尊重用戶隱私。以下是詳細原因：</p>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">1. 法律要求</h3>
        <ul class="list-disc list-inside mb-4">
            <li>許多國家和地區都有隱私法規，要求網站在使用 Cookie（特別是追蹤或分析類的 Cookie）時，必須通知用戶並取得同意。例如：</li>
            <li><strong class="font-bold">GDPR（歐盟《通用數據保護條例》）</strong>：需要取得用戶明確的同意（opt-in），尤其是涉及廣告追蹤或個人數據的 Cookie。</li>
            <li><strong class="font-bold">ePrivacy Directive（歐盟《電子隱私指令》）</strong>：強制網站在存取非必要 Cookie 之前，提供清楚的通知與選擇。</li>
            <li><strong class="font-bold">CCPA（美國加州《消費者隱私法》）</strong>：要求企業讓用戶能選擇「不要出售我的個人信息」，並提供隱私權聲明。</li>
        </ul>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">2. 用戶知情權</h3>
        <p class="mb-4">現代網站使用許多 Cookie 來進行：</p>
        <ul class="list-disc list-inside mb-4">
            <li>✅ 分析（Analytics）：如 Google Analytics 追蹤網站流量</li>
            <li>✅ 個人化（Personalization）：如記住使用者登入狀態或語言偏好</li>
            <li>✅ 廣告（Advertising）：如 Facebook Pixel、Google Ads 追蹤用戶行為以提供個人化廣告</li>
        </ul>
        <p class="mb-4">使用者應該知道自己的數據是如何被使用，並有選擇權。</p>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">3. 建立信任</h3>
        <p class="mb-4">如果網站透明地告知 Cookie 的使用方式，並提供選擇（例如「僅接受必要 Cookie」或「拒絕廣告 Cookie」），可以提升使用者對網站的信任度，避免反感或法律風險。</p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">沒有告知 cookie 的使用，違法嗎？</h2>
        <p class="mb-4">這取決於網站的目標受眾以及適用的法律。如果你的網站面向歐盟、加州或其他有相關法規的地區，而且使用了非必要 Cookie（如廣告、分析或行為追蹤 Cookie），那麼不提供 Cookie
            告知可能會違法，並可能面臨罰款或其他法律責任。</p>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">✅ 哪些情況下需要 Cookie 告知？</h3>
        <ul class="list-disc list-inside mb-4">
            <li>你的網站有訪問者來自歐盟（適用 GDPR 和 ePrivacy Directive）</li>
            <li>你的網站收集加州居民的數據（適用 CCPA）</li>
            <li>你的網站使用非必要的 Cookie，例如：</li>
            <ul class="list-disc list-inside ml-6 mb-4">
                <li>Google Analytics（網站分析工具）</li>
                <li>Facebook Pixel（廣告追蹤）</li>
                <li>個人化 Cookie（如記住用戶偏好但非必要）</li>
                <li>任何涉及第三方服務的 Cookie（如嵌入 YouTube 影片會使用 Google 追蹤 Cookie）</li>
            </ul>
        </ul>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">❌ 哪些情況可能不需要 Cookie 告知？</h3>
        <p class="mb-4">如果你的網站只使用必要 Cookie（即那些確保網站基本功能運作的 Cookie），通常不需要取得用戶同意，但仍建議在隱私政策中說明。</p>

        <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-2">🔥 不遵守 Cookie 規範的風險</h3>
        <ul class="list-disc list-inside mb-4">
            <li>GDPR 罰款：最高可達全球營收的 4% 或 2,000 萬歐元（取較高者）。例如 Google 和 Facebook 都因違反 GDPR 被罰款數百萬歐元。</li>
            <li>CCPA 處罰：每次違規可罰款 2,500 美元（非故意）或 7,500 美元（故意），且消費者可提起訴訟。</li>
            <li>網站信譽受損：如果用戶發現網站未經允許就追蹤行為，可能會降低信任感，甚至導致客訴或流失用戶。</li>
        </ul>

        <div class="divider h-[1px] bg-gray-200 my-[30px]"></div>
        <div class="flex justify-center items-center gap-5">
            <a href="https://www.instagram.com/markey6390" target="_blank" style="height:24px;line-height:24px;">
                <i style="font-size: 24px;" class="fab fa-instagram text-gray-600"></i>
            </a>
            <a href="https://github.com/markey6390/cookie-pop" target="_blank" class="text-gray-600">
                <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.58 7.58 0 0 1 4 0c1.52-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
            </a>
        </div>
    </div>
</template>