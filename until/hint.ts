/*
 * 字节小程序官方api不支持，但全局存在wx实例，会走wx的逻辑
 */
import { _env, getLang, ty } from '../until';



export const _hint = (i18n: any) => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' ) {
    _publicHint(i18n)
  } else if (_env === 'alipay') {
    _alipayHint(i18n)
  } else if (_env === 'browser') {
    window.location.reload()
  } else {
    console.error('不支持当前环境');
  }
}

function _publicHint (
  i18n: { langTag: string; getLanguagePackList: () => any;
   _formatLanguageTag: (arg0: any) => any; lang: any; themeColor: any; 
   setLocales: (arg0: any) => void; defualtLang: any; 
  }) {

  const langList = i18n.getLanguagePackList()
  const sysLang = getLang()
  const tag = i18n._formatLanguageTag(sysLang)
  const isChinese = tag === 'zh-Hans'
  const index = langList.findIndex((item: string)=> item === tag)
  if(sysLang !== i18n.lang) {
    if(index !== -1) {
      ty.showModal({
        title: isChinese ? '提示' : 'Hint',
        cancelText: isChinese ? '取消' : 'Cancel',
        confirmText: isChinese ? '切换' : 'Switch',
        confirmColor: i18n.themeColor,
        content: isChinese ? `当前系统语言为${sysLang}，是否切换？` : `
        The current system language is ${sysLang}, do you want to switch?`,
        success (res: { confirm: any; cancel: any; }) {
          if (res.confirm) {
            i18n.setLocales({ lang: sysLang, isReload: true })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if(i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
      ty.showModal({
        title: isChinese ? '提示' : 'Hint',
        cancelText: isChinese ? '取消' : 'Cancel',
        confirmText: isChinese ? '切换' : 'Switch',
        confirmColor: i18n.themeColor,
        content: isChinese ? `不支持当前系统语言${sysLang}，是否切换为英文？` : `
        The current system language ${sysLang} is not supported, should you switch to English?`,
        success (res: { confirm: any; cancel: any; }) {
          if (res.confirm) {
            i18n.setLocales(i18n.defualtLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}

function _alipayHint (
  i18n: { langTag: string; getLanguagePackList: () => any;
     _formatLanguageTag: (arg0: any) => any; lang: any; 
     setLocales: (arg0: any) => void; defualtLang: any; 
  }) {
  const isChinese = i18n.langTag === 'zh-Hans'
  const langList = i18n.getLanguagePackList()
  const sysLang = getLang()
  const tag = i18n._formatLanguageTag(sysLang)
  const index = langList.findIndex((item: string) => item === tag)
  // console.log('getLang()', sysLang, tag, i18n.lang, index);
  if(sysLang !== i18n.lang) {
    if(index !== -1) {
      ty.confirm({
        title: isChinese ? '提示' : 'Hint',
        cancelButtonText: isChinese ? '取消' : 'Cancel',
        confirmButtonText: isChinese ? '切换' : 'Switch',
        // confirmColor: i18n.themeColor,
        content: isChinese ? `当前系统语言为${sysLang}，是否切换？` : `
        The current system language is ${sysLang}, do you want to switch?`,
        success (res: { confirm: any; cancel: any; }) {
          if (res.confirm) {
            i18n.setLocales(sysLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if(i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
      ty.confirm({
        title: isChinese ? '提示' : 'Hint',
        cancelButtonText: isChinese ? '取消' : 'Cancel',
        confirmButtonText: isChinese ? '切换' : 'Switch',
        // confirmColor: i18n.themeColor,
        content: isChinese ? `不支持当前系统语言${sysLang}，是否切换为英文？` : `
        The current system language ${sysLang} is not supported, should you switch to English?`,
        success (res: { confirm: any; cancel: any; }) {
          if (res.confirm) {
            i18n.setLocales(i18n.defualtLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
