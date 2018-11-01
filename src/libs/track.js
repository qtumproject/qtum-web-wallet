const track = (category, data) => {
  if (!window.gtag) return false
  const params = {
    event_category: category,
    event_label: data,
    non_interaction: true
  }
  window.gtag('event', 'log', params)
}

const trackAction = (action, category, label) => {
  if (!window.gtag) return false
  const params = {}
  if (category !== undefined) {
    params.event_category = category
  }
  if (label !== undefined) {
    params.event_label = label
  }
  if (Object.keys(params).length) {
    window.gtag('event', action, params)
  } else {
    window.gtag('event', action)
  }
}

const trackStep = (name, prevStep, nextStep) => {
  trackAction('next', name, `${prevStep} => ${nextStep}`)
}

const trackDone = (name) => {
  trackAction('done', name, 'done')
}

const trackException = (description, fatal = false) => {
  if (!window.gtag) return false
  window.gtag('event', 'exception', {
    description,
    fatal
  })
}

export default {
  track,
  trackAction,
  trackStep,
  trackDone,
  trackException
}
