<script setup>
import { computed, reactive, ref, onMounted } from 'vue';
import MainContent from './components/MainContent.vue'
import '@fortawesome/fontawesome-free/css/all.css';

const messageTemplates = {
  simple: `本站使用必要的cookies來使網站正常運作。`,
  standard: `本網站使用cookies以提升您的瀏覽體驗，您可以閱讀本站的<a href="_USER_POLICY_URL_">_USER_POLICY_PAGE_NAME_</a>來了解更多。`,
  detailed: `本站除了使用功能性必要的cookies以外，也使用cookies來了解您如何使用我們的網站，以便我們可以不斷改進。若您繼續瀏覽本網站，即表示您同意我們的<a href="_USER_POLICY_URL_">_USER_POLICY_PAGE_NAME_</a>。`,
}

const selectedTemplate = ref(messageTemplates.standard);

const stylePresets = reactive({
  absolute: {
    label: '固定於右下',
    styles: {
      position: 'fixed',
      maxWidth: '420px',
      right: '30px',
      bottom: '30px',
      left: 'auto',
      top: 'auto',
      borderRadius: '10px',
    }
  },
  fixed: {
    label: '固定於下方',
    styles: {
      position: 'fixed',
      maxWidth: '100vw',
      left: '0',
      right: '0',
      bottom: '0',
      top: 'auto',
      borderRadius: '0',
    }
  }
})

const cookiePopStyles = reactive({
  position: 'fixed',
  width: '100vw',
  maxWidth: '420px',
  height: 'auto',
  borderStyle: 'solid',
  borderWidth: '0px',
  borderColor: '#000000',
  borderRadius: '10px',
  left: 'auto',
  right: '30px',
  top: 'auto',
  bottom: '30px',
  backgroundColor: '#ffffff',
  backgroundOpacity: 1,
  fontSize: '16px',
  textAlign: 'left',
  padding: '30px',
  lineHeight: '1.4',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 12,
  shadowSpread: 0,
  shadowColor: '#888888',
  zIndex: 9999,
});

const isContentSettingsOpen = ref(true);
const isSizeSettingsOpen = ref(false);
const isPositionSettingsOpen = ref(false);
const isBorderSettingsOpen = ref(false);
const isShadowSettingsOpen = ref(false);

const expirationTime = ref(7 * 24 * 60 * 60);
const isExpirationSettingsOpen = ref(false);
const showCopyContent = ref(false);
const showCopySuccess = ref(false)
const generatedCode = ref('')

const closeButton = reactive({
  show: false,
  message: '了解，關閉',
  containerStyle: {
    display: 'flex',
    justifyContent: 'end',
  },
  styles: {
    bottom: '30px',
    right: '30px',
    marginTop: '10px',
    backgroundColor: 'transparent',
    color: 'gray',
    padding: '7px 10px',
    border: 'none',
    textDecoration: 'underline',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
})


const linkText = ref('隱私政策');
const linkUrl = ref('/pages/policy-terms');
const displayMessage = computed(() => {
  return selectedTemplate.value.replace('_USER_POLICY_URL_', linkUrl.value).replace('_USER_POLICY_PAGE_NAME_', linkText.value);
})

const hints = reactive({
  currentHint: 0,
  controlPanel: {
    show: true,
    message: '👈 這裡是控制面板，您可以透過這裡的選項來自訂您的 Cookie Pop 內容與外觀！',
  },
  resultPreview: {
    show: false,
    message: '右方是您當前所設定的 Cookie Pop 外觀預覽，完成後點擊上方按鈕來瀏覽並複製程式碼。',
  }
})

const showOverlay = computed(() => {
  const shouldShowOverlay = hints.controlPanel.show || hints.resultPreview.show || showCopyContent.value
  return shouldShowOverlay
})

const selectedPreset = ref('absolute');

function applyPreset() {
  const preset = stylePresets[selectedPreset.value];
  Object.assign(cookiePopStyles, preset.styles);
}

function closeCookiePop() {
  // Logic to close the Cookie Pop
  console.log('Cookie Pop closed');
}

function copyContent() {
  showCopyContent.value = true;
  const cookieKey = `cookiePopClosed_${Math.random().toString(36).substring(2, 15)}`;

  const clonedElement = (document.getElementById('CookiePop')).cloneNode(true);
  clonedElement.style.display = 'none';
  (['#CookiePopResultPreviewMessage', '#CookiePopCopyButton']).forEach(selector => {
    clonedElement.querySelectorAll(selector).forEach(el => el.remove());
  });
  const htmlCode = (clonedElement.outerHTML).replace(/<!--[\s\S]*?-->/g, "");

  generatedCode.value = `
${htmlCode}
<script>
if (!document.cookie.includes("${cookieKey}=true")) { document.querySelector('#CookiePop').style.display = 'block'; }
document.querySelector('#CookiePopCloseButton').addEventListener('click', function() { document.cookie = "${cookieKey}=true; path=\/; max-age=${expirationTime.value}"; document.querySelector('#CookiePop').style.display = 'none'; });
<\/script>`;
}

function copyToClipboard() {
  const content = generatedCode.value;
  navigator.clipboard.writeText(content).then(() => {
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 2000);
  }).catch(err => {
    console.error('複製失敗', err);
  });
}

function gotToNextHint(steps) {
  if (steps === 0) {
    hints.controlPanel.show = true;
    hints.resultPreview.show = false;
    hints.currentHint = 0;
  } else {
    if (hints.currentHint === 0) {
      hints.controlPanel.show = false;
      hints.resultPreview.show = true;
    } else if (hints.currentHint === 1) {
      hints.resultPreview.show = false;
      // 設置 cookie，24 小時內不再顯示提示
      document.cookie = "hideHints=true; max-age=86400; path=/";
    }
    hints.currentHint++;
  }
}

onMounted(() => {
  if (getCookie('hideHints') !== 'true') {
    hints.controlPanel.show = true;
  } else {
    hints.controlPanel.show = false;
    hints.resultPreview.show = false;
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
</script>

<template>
  <div class="flex">
    <div v-if="showOverlay" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"></div>
    <!-- 功能面板 -->
    <div class="w-[300px] h-screen fixed left-0 top-0 p-4 bg-gray-100 pb-[200px]"
      :style="{ overflowY: hints.controlPanel.show ? 'visible' : 'auto' }"
      :class="hints.controlPanel.show ? 'z-100' : 'z-0'">
      <div class="mb-6 text-left">
        <div v-if="hints.controlPanel.show"
          class="text-blue font-bold inline-block p-4 bg-white z-[150] rounded-lg absolute top-15 left-[calc(100%+15px)] w-full border border-gray-300 shadow-md">
          <div>
            {{ hints.controlPanel.message }}
          </div>
          <div class="flex justify-end">
            <button @click="gotToNextHint" class="text-blue-500">
              好的！
            </button>
          </div>
        </div>
        <h3 :class="{ 'text-blue-500 border-blue-500': isContentSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300 flex justify-between">
          <span @click="isContentSettingsOpen = !isContentSettingsOpen">主要內容</span>
          <span class="text-gray-500 text-sm" @click="gotToNextHint(0)">
            教學提示
          </span>
        </h3>
        <div v-if="isContentSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">預設樣式模板</label>
            <select v-model="selectedPreset" @change="applyPreset" class="w-full p-2 border">
              <option v-for="(preset, key) in stylePresets" :key="key" :value="key">
                {{ preset.label }}
              </option>
            </select>
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">預設內文樣板</label>
            <select v-model="selectedTemplate" class="w-full p-2 border">
              <option :value="messageTemplates.simple">簡單</option>
              <option :value="messageTemplates.standard">標準</option>
              <option :value="messageTemplates.detailed">詳盡</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2">連結文字</label>
            <input type="text" v-model="linkText" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">連結網址</label>
            <input type="text" v-model="linkUrl" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">字體大小</label>
            <input type="text" v-model="cookiePopStyles.fontSize" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">內文對齊</label>
            <select v-model="cookiePopStyles.textAlign" class="w-full p-2 border">
              <option value="left">左對齊</option>
              <option value="center">置中</option>
              <option value="right">右對齊</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2">內距 Padding</label>
            <input type="text" v-model="cookiePopStyles.padding" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">內容行高</label>
            <input type="text" v-model="cookiePopStyles.lineHeight" class="w-full p-2 border" />
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">背景顏色</label>
            <div @click="$refs.bgColorPicker.click()" class="w-full p-2 border bg-gray-200"
              :style="{ backgroundColor: cookiePopStyles.backgroundColor }"></div>
            <input type="color" v-model="cookiePopStyles.backgroundColor" ref="bgColorPicker" class="hidden"
              @input="cookiePopStyles.backgroundColor = $event.target.value" />
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">背景透明度</label>
            <input type="range" v-model="cookiePopStyles.backgroundOpacity" min="0" max="1" step="0.01"
              class="w-full" />
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">堆疊順序(z-index)</label>
            <input type="text" v-model="cookiePopStyles.zIndex" class="w-full p-2 border">
          </div>
        </div>
      </div>

      <div class="mb-6 text-left">
        <h3 :class="{ 'text-blue-500 border-blue-500': isExpirationSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300"
          @click="isExpirationSettingsOpen = !isExpirationSettingsOpen">
          關閉按鈕設置
        </h3>
        <div v-if="isExpirationSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">按鈕文字</label>
            <input type="text" v-model="closeButton.message" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">按鈕文字大小</label>
            <input type="text" v-model="closeButton.styles.fontSize" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">按鈕位置</label>
            <select v-model="closeButton.containerStyle.justifyContent" class="w-full p-2 border">
              <option value="start">置左</option>
              <option value="center">置中</option>
              <option value="end">置右</option>
            </select>
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">按鈕文字顏色</label>
            <div @click="$refs.textColorPicker.click()" class="w-full p-2 border bg-gray-200"
              :style="{ backgroundColor: closeButton.styles.color }"></div>
            <input type="color" v-model="closeButton.styles.color" ref="textColorPicker" class="hidden"
              @input="closeButton.styles.color = $event.target.value" />
          </div>
          <div class="mb-4 text-left">
            <label class="block mb-2">按鈕背景色</label>
            <div @click="$refs.bgColorPicker.click()" class="w-full p-2 border bg-gray-200"
              :style="{ backgroundColor: closeButton.styles.backgroundColor }"></div>
            <input type="color" v-model="closeButton.styles.backgroundColor" ref="bgColorPicker" class="hidden"
              @input="closeButton.styles.backgroundColor = $event.target.value" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">詢問週期（單位是秒，預設1週）</label>
            <input type="text" v-model="expirationTime" class="w-full p-2 border" />
          </div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <h3 :class="{ 'text-blue-500 border-blue-500': isSizeSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300"
          @click="isSizeSettingsOpen = !isSizeSettingsOpen">
          尺寸設置
        </h3>
        <div v-if="isSizeSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">寬度</label>
            <input type="text" v-model="cookiePopStyles.width" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">最大寬度(寬度隨視窗變大，但不會超過這個數值)</label>
            <input type="text" v-model="cookiePopStyles.maxWidth" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">高度</label>
            <input type="text" v-model="cookiePopStyles.height" class="w-full p-2 border" />
          </div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <h3 :class="{ 'text-blue-500 border-blue-500': isPositionSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300"
          @click="isPositionSettingsOpen = !isPositionSettingsOpen">
          定位設置
        </h3>
        <div v-if="isPositionSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">定位方式</label>
            <select v-model="cookiePopStyles.position" class="w-full p-2 border">
              <option value="fixed">固定</option>
              <option value="absolute">絕對</option>
              <option value="relative">相對</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2">左定位</label>
            <input type="text" v-model="cookiePopStyles.left" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">右定位</label>
            <input type="text" v-model="cookiePopStyles.right" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">上定位</label>
            <input type="text" v-model="cookiePopStyles.top" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">下定位</label>
            <input type="text" v-model="cookiePopStyles.bottom" class="w-full p-2 border" />
          </div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <h3 :class="{ 'text-blue-500 border-blue-500': isBorderSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300"
          @click="isBorderSettingsOpen = !isBorderSettingsOpen">
          外框設置
        </h3>
        <div v-if="isBorderSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">外框樣式</label>
            <select v-model="cookiePopStyles.borderStyle" class="w-full p-2 border">
              <option value="solid">實線</option>
              <option value="dashed">虛線</option>
              <option value="dotted">點線</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2">外框粗細</label>
            <input type="text" v-model="cookiePopStyles.borderWidth" class="w-full p-2 border" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">外框顏色</label>
            <div @click="$refs.colorPicker.click()" class="w-full p-2 border bg-gray-200"
              :style="{ backgroundColor: cookiePopStyles.borderColor }"></div>
            <input type="color" v-model="cookiePopStyles.borderColor" ref="colorPicker" class="hidden"
              @input="cookiePopStyles.borderColor = $event.target.value" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">外框圓角</label>
            <input type="text" v-model="cookiePopStyles.borderRadius" class="w-full p-2 border" />
          </div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <h3 :class="{ 'text-blue-500 border-blue-500': isShadowSettingsOpen }"
          class="text-md font-bold mb-2 cursor-pointer border-b border-gray-300"
          @click="isShadowSettingsOpen = !isShadowSettingsOpen">
          陰影設置
        </h3>
        <div v-if="isShadowSettingsOpen">
          <div class="mb-4">
            <label class="block mb-2">陰影顏色</label>
            <div @click="$refs.shadowColorPicker.click()" class="w-full p-2 border bg-gray-200"
              :style="{ backgroundColor: cookiePopStyles.shadowColor }"></div>
            <input type="color" v-model="cookiePopStyles.shadowColor" ref="shadowColorPicker" class="hidden"
              @input="cookiePopStyles.shadowColor = $event.target.value" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">水平偏移: {{ cookiePopStyles.shadowOffsetX }}px</label>
            <input type="range" v-model="cookiePopStyles.shadowOffsetX" min="-50" max="50" step="1" class="w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">垂直偏移: {{ cookiePopStyles.shadowOffsetY }}px</label>
            <input type="range" v-model="cookiePopStyles.shadowOffsetY" min="-50" max="50" step="1" class="w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">模糊半徑: {{ cookiePopStyles.shadowBlur }}px</label>
            <input type="range" v-model="cookiePopStyles.shadowBlur" min="0" max="100" step="1" class="w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">擴展半徑: {{ cookiePopStyles.shadowSpread }}px</label>
            <input type="range" v-model="cookiePopStyles.shadowSpread" min="-50" max="50" step="1" class="w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- 網頁內容區域 -->
    <div class="relative flex-1 ml-[300px] p-4 overflow-y-auto h-screen">

      <div id="resultContainer" v-if="showCopyContent" class="fixed z-150 max-w-[600px] w-screen right-15 top-15">
        <div class="mt-4 p-6 border bg-white shadow-lg  relative rounded-lg max-w-3xl mx-auto">
          <h3 class="font-bold mb-4 flex justify-start items-center">
            HTML/JavaScript 程式碼
            <div class="flex items-center">
              <button @click="copyToClipboard" class="text-gray-500 hover:text-gray-700 ml-4">
                <i class="fas fa-copy"></i>
              </button>
              <span v-if="showCopySuccess" class="text-green-500 ml-2">複製成功！</span>
            </div>
          </h3>
          <pre class="overflow-auto max-h-64 bg-gray-100 p-4 rounded-lg">
            {{ generatedCode }}
          </pre>
          <div class="flex justify-center items-center mt-4">
            <button @click="showCopyContent = false" class="text-white bg-gray-400 px-4 py-2 rounded-md">
              關閉
            </button>
          </div>
        </div>
      </div>


      <MainContent />


      <div id="CookiePop" :style="{
        position: cookiePopStyles.position,
        width: cookiePopStyles.width,
        maxWidth: cookiePopStyles.maxWidth,
        height: cookiePopStyles.height,
        borderStyle: cookiePopStyles.borderStyle,
        borderWidth: cookiePopStyles.borderWidth,
        borderColor: cookiePopStyles.borderColor,
        borderRadius: cookiePopStyles.borderRadius,
        left: cookiePopStyles.left,
        right: cookiePopStyles.right,
        top: cookiePopStyles.top,
        bottom: cookiePopStyles.bottom,
        backgroundColor: `rgba(${parseInt(cookiePopStyles.backgroundColor.slice(1, 3), 16)}, ${parseInt(cookiePopStyles.backgroundColor.slice(3, 5), 16)}, ${parseInt(cookiePopStyles.backgroundColor.slice(5, 7), 16)}, ${cookiePopStyles.backgroundOpacity})`,
        fontSize: cookiePopStyles.fontSize,
        textAlign: cookiePopStyles.textAlign,
        padding: cookiePopStyles.padding,
        lineHeight: cookiePopStyles.lineHeight,
        boxShadow: `${cookiePopStyles.shadowOffsetX}px ${cookiePopStyles.shadowOffsetY}px ${cookiePopStyles.shadowBlur}px ${cookiePopStyles.shadowSpread}px ${cookiePopStyles.shadowColor}`,
      }" :class="hints.resultPreview.show ? 'z-100' : ''">
        <button id="CookiePopCopyButton" @click="copyContent"
          class="absolute bottom-[calc(100%+10px)] left-2 text-green-500 hover:text-gray-700 bg-white rounded-full p-2 border border-green-300 shadow-md">
          <i class="fas fa-code"></i>
        </button>
        <div v-if="hints.resultPreview.show" id="CookiePopResultPreviewMessage"
          class="text-blue font-bold inline-block p-4 bg-white z-[150] rounded-lg absolute top-5 right-[calc(100%+15px)] w-[260px] border border-gray-300 shadow-md"
          style="font-size: 1rem;">
          <div>
            {{ hints.resultPreview.message }}
          </div>
          <div class="flex justify-end">
            <button @click="gotToNextHint" class="text-blue-500">
              好的！
            </button>
          </div>
        </div>
        <div v-html="displayMessage" />
        <div :style="closeButton.containerStyle">
          <button id="CookiePopCloseButton" @click="closeCookiePop" :style="closeButton.styles">
            {{ closeButton.message }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>