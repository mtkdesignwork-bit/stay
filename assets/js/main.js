document.documentElement.classList.add('js');

// フォントは、画面に最初の表示が出たあとで読み込む
// （日本語フォントはファイルが多く、表示の前に読み始めると、届くまで画面が真っ白のままになるため）
const loadFonts = () => {
  if (loadFonts.done) return;
  loadFonts.done = true;
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Noto+Sans+JP:wght@300;400&family=Shippori+Mincho:wght@400&display=swap';
  document.head.appendChild(fontLink);
};
if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('paint')) {
  new PerformanceObserver((list, observer) => {
    if (list.getEntries().some((entry) => entry.name === 'first-contentful-paint')) {
      observer.disconnect();
      loadFonts();
    }
  }).observe({ type: 'paint', buffered: true });
}
// 最初の表示を知る仕組みがないブラウザ向けの保険
window.addEventListener('load', () => setTimeout(loadFonts, 3000));

// リンクから開いたときは、必ずページのいちばん上から表示する
// （iPhoneのSafariは前に見た位置を覚えていて、リンクで開き直してもフッターなどに飛ぶことがあるため。
//   「戻る」「再読み込み」や #付きのリンクのときは何もしない）
const navEntry = performance.getEntriesByType('navigation')[0];
if (navEntry && navEntry.type === 'navigate' && !window.location.hash) {
  // 読み込み中に自分でスクロールし始めた人は、上に戻さない
  let userScrolled = false;
  ['touchstart', 'wheel', 'keydown'].forEach((type) => {
    window.addEventListener(type, () => { userScrolled = true; }, { once: true, passive: true });
  });
  const scrollToTop = () => {
    if (!userScrolled && window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'instant' });
  };
  scrollToTop();
  window.addEventListener('load', scrollToTop, { once: true });
}

// ファイルを直接開いて確認するとき（file://）は、フォルダ名で終わるリンクがフォルダの一覧になってしまうので、
// 末尾に index.html を足す。公開したサイトやサーバー経由では何もしない（URL は末尾が / のまま）
if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (/^([a-z]+:|#)/i.test(href)) return;
    const [, path, rest] = href.match(/^([^?#]*)(.*)$/);
    if (path === '' || path.endsWith('/')) link.setAttribute('href', `${path}index.html${rest}`);
  });
}

// スクロールで要素をふわっと表示（.js-zoom は写真をゆっくり等倍に戻す）
const fadeTargets = document.querySelectorAll('.js-fade, .js-zoom');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  fadeTargets.forEach((el) => observer.observe(el));
} else {
  fadeTargets.forEach((el) => el.classList.add('is-visible'));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// メインビジュアル：スクロール量（0〜1）を --progress として渡し、写真を生成りに溶かす
const hero = document.querySelector('.js-hero');

if (hero && !prefersReducedMotion) {
  let ticking = false;

  const updateHero = () => {
    const progress = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
    hero.style.setProperty('--progress', progress.toFixed(3));
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHero);
      ticking = true;
    }
  }, { passive: true });

  updateHero();
}

// ヘッダー：メインビジュアル（TOP）や各ページの写真のFVを過ぎたら透明をやめる
const header = document.querySelector('.js-header');
const overlayArea = hero || document.querySelector('.js-page-hero');

if (header && overlayArea) {
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > overlayArea.offsetHeight - header.offsetHeight);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

// 写真のパララックス：画面内の位置（-1〜1）を --shift として渡し、枠の中で写真を少しずつ動かす
const parallaxTargets = document.querySelectorAll('.js-parallax');

if (parallaxTargets.length && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const vh = window.innerHeight;
    parallaxTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const shift = ((rect.top + rect.height / 2) - vh / 2) / (vh / 2 + rect.height / 2);
      el.style.setProperty('--shift', (-shift).toFixed(3));
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateParallax);
  updateParallax();
}

// 4つの過ごし方：スクロール量に合わせて、手前の場面から下→上へ拭き取る
const scenes = document.querySelector('.js-scenes');

if (scenes) {
  const sceneItems = scenes.querySelectorAll('.scene');
  const sceneMq = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const clamp = (n) => Math.min(Math.max(n, 0), 1);
  let ticking = false;

  const updateScenes = () => {
    ticking = false;

    if (!sceneMq.matches) {
      sceneItems.forEach((scene) => {
        scene.style.removeProperty('--wipe');
        scene.classList.remove('is-active');
      });
      return;
    }

    const scrollable = scenes.offsetHeight - window.innerHeight;
    // 0〜3（場面の数 - 1）
    const progress = clamp(-scenes.getBoundingClientRect().top / scrollable) * (sceneItems.length - 1);
    const active = Math.min(Math.round(progress), sceneItems.length - 1);

    sceneItems.forEach((scene, i) => {
      // めくれる前後に少し止まる時間をつくる（区間の最初と最後の15%は動かさない）
      scene.style.setProperty('--wipe', clamp((progress - i - 0.15) / 0.7).toFixed(4));
      scene.classList.toggle('is-active', i === active);
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScenes);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  sceneMq.addEventListener('change', requestUpdate);
  updateScenes();
}

// 絞り込み（STAYS：過ごし方／NEWS：カテゴリー）
// .js-filter の data-param がURLの名前（例：?style=sauna、?cat=plan）。項目は .js-filter-item の data-tags で出し分ける
const filter = document.querySelector('.js-filter');

if (filter) {
  const param = filter.dataset.param;
  const buttons = filter.querySelectorAll('.js-filter-btn');
  const items = document.querySelectorAll('.js-filter-item');
  const count = filter.querySelector('.js-filter-count');
  const values = [...buttons].map((btn) => btn.dataset.value);

  const applyFilter = (value, updateUrl) => {
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.value === value));
    });

    let shown = 0;
    items.forEach((item) => {
      const isMatch = value === 'all' || item.dataset.tags.split(' ').includes(value);
      item.hidden = !isMatch;
      if (isMatch) shown += 1;
    });
    if (count) count.textContent = shown;

    // 戻るボタンの履歴を増やさないよう、URLは置き換える
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (value === 'all') {
        url.searchParams.delete(param);
      } else {
        url.searchParams.set(param, value);
      }
      history.replaceState(null, '', url);
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.value, true));
  });

  const initialValue = new URLSearchParams(window.location.search).get(param);
  if (values.includes(initialValue)) applyFilter(initialValue, false);
}

// RESERVE：予約フォーム（入力 → 確認 → 完了を同じページで切り替える。実際の送信はしない）
const reserveForm = document.querySelector('.js-reserve-form');

if (reserveForm) {
  const f = reserveForm.elements;
  const confirmPanel = document.querySelector('.js-reserve-confirm');
  const donePanel = document.querySelector('.js-reserve-done');
  const stepItems = document.querySelectorAll('.js-steps .steps__item');

  const pad = (n) => String(n).padStart(2, '0');
  const week = ['日', '月', '火', '水', '木', '金', '土'];
  const yen = (n) => `¥${n.toLocaleString('ja-JP')}`;
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fromISO = (s) => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const formatDate = (d, withYear = true) => `${withYear ? `${d.getFullYear()}年` : ''}${d.getMonth() + 1}月${d.getDate()}日（${week[d.getDay()]}）`;

  // 選べる日付は、明日から6か月先まで（GUIDEの「6か月前から予約できる」と合わせる）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);
  f.date.min = toISO(minDate);
  f.date.max = toISO(maxDate);

  // 宿のページから来たとき（?stay=biei など）は、その宿を選んでおく
  const initialStay = new URLSearchParams(window.location.search).get('stay');
  if ([...f.stay.options].some((o) => o.value && o.value === initialStay)) f.stay.value = initialStay;

  // 選んでいる宿のルール（HTML の data-* に書いてある）
  const getStay = () => {
    const o = f.stay.selectedOptions[0];
    if (!o || !o.value) return null;
    return {
      slug: o.value,
      name: o.textContent,
      capacity: Number(o.dataset.capacity),
      kids: o.dataset.kids === 'true',
      checkin: o.dataset.checkin,
      checkinEnd: o.dataset.checkinEnd,
      price: Number(o.dataset.price),
      extra: Number(o.dataset.extra),
    };
  };

  const guestCount = () => Number(f.adults.value) + Number(f.kids.value);
  // 料金の目安：平日料金 ×泊数。3名以上は宿ごとの追加料金を足す
  const totalOf = (stay) => (stay.price + stay.extra * Math.max(0, guestCount() - 2)) * Number(f.nights.value);
  const dateText = () => {
    if (!f.date.value) return '';
    const checkin = fromISO(f.date.value);
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + Number(f.nights.value));
    return `${formatDate(checkin)}〜${formatDate(checkout, false)}　${f.nights.value}泊`;
  };
  const guestText = () => `大人${f.adults.value}名${Number(f.kids.value) ? `・子ども${f.kids.value}名` : ''}`;
  const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  // 入力チェック：問題があればメッセージ、なければ空文字を返す
  const rules = {
    stay: () => (f.stay.value ? '' : '宿を選んでください。'),
    date: () => {
      if (!f.date.value) return 'チェックイン日を選んでください。';
      const d = fromISO(f.date.value);
      return d < minDate || d > maxDate ? `${formatDate(minDate)}から${formatDate(maxDate)}までの日付を選んでください。` : '';
    },
    guests: () => {
      const stay = getStay();
      if (!stay) return '';
      if (!stay.kids && Number(f.kids.value) > 0) return 'この宿は梯子をのぼって出入りするため、小学生以下のお子さまはご利用いただけません。';
      if (guestCount() > stay.capacity) return `この宿の定員は${stay.capacity}名です。人数を減らすか、ほかの宿をお選びください。`;
      return '';
    },
    name: () => (f.name.value.trim() ? '' : 'お名前を入力してください。'),
    kana: () => {
      const v = f.kana.value.trim();
      if (!v) return 'ふりがなを入力してください。';
      return /^[ぁ-ゖー\s　]+$/.test(v) ? '' : 'ふりがなは、ひらがなで入力してください。';
    },
    email: () => {
      const v = f.email.value.trim();
      if (!v) return 'メールアドレスを入力してください。';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'メールアドレスの形式が正しくありません（例：hiyori@example.com）。';
    },
    tel: () => {
      const v = f.tel.value.replace(/[-‐ー－\s]/g, '');
      if (!v) return '電話番号を入力してください。';
      return /^0\d{9,10}$/.test(v) ? '' : '電話番号は、0から始まる10桁か11桁の数字で入力してください。';
    },
    arrival: () => {
      if (!f.arrival.value) return '到着予定時刻を選んでください。';
      const stay = getStay();
      if (!stay) return '';
      const t = toMinutes(f.arrival.value);
      return t < toMinutes(stay.checkin) || t > toMinutes(stay.checkinEnd) ? `この宿のチェックインは${stay.checkin}〜${stay.checkinEnd}です。時間内でお選びください。` : '';
    },
    agree: () => (f.agree.checked ? '' : 'キャンセル規定とプライバシーポリシーへの同意が必要です。'),
  };
  const controlsOf = (name) => (name === 'guests' ? [f.adults, f.kids] : [f[name]]);

  // 補足とエラーを読み上げられるように、入力欄とつなぐ
  Object.keys(rules).forEach((name) => {
    if (name === 'guests' || name === 'agree') return;
    const ids = [`${name}-note`, `${name}-error`].filter((id) => document.getElementById(id));
    f[name].setAttribute('aria-describedby', ids.join(' '));
  });

  const validate = (name) => {
    const message = rules[name]();
    document.getElementById(`${name}-error`).textContent = message;
    controlsOf(name).forEach((c) => c.setAttribute('aria-invalid', String(Boolean(message))));
    return !message;
  };

  // 最初から赤くしないよう、一度触れた項目だけチェックする
  const touched = new Set();
  Object.keys(rules).forEach((name) => {
    controlsOf(name).forEach((c) => {
      c.addEventListener('blur', () => {
        touched.add(name);
        validate(name);
      });
      c.addEventListener('change', () => {
        if (touched.has(name)) validate(name);
      });
    });
  });

  // 宿を変えたら、宿のルールに関わる項目もチェックし直す
  f.stay.addEventListener('change', () => {
    ['guests', 'arrival'].forEach((name) => {
      if (touched.has(name)) validate(name);
    });
  });
  f.adults.addEventListener('change', () => touched.add('guests') && validate('guests'));
  f.kids.addEventListener('change', () => touched.add('guests') && validate('guests'));

  // 予約内容のまとめ
  const summaryImg = document.querySelector('.js-summary-img');
  const updateSummary = () => {
    const stay = getStay();
    document.querySelector('.js-summary-stay').textContent = stay ? stay.name : '宿を選んでください';
    document.querySelector('.js-summary-date').textContent = dateText() || '—';
    document.querySelector('.js-summary-guests').textContent = guestText();
    document.querySelector('.js-summary-total').textContent = stay ? yen(totalOf(stay)) : '—';
    summaryImg.hidden = !stay;
    if (stay) {
      // まとめの写真は幅320px前後なので、小さいサイズを使う
      summaryImg.src = `../assets/images/stays/${stay.slug}/main-750.webp`;
      summaryImg.alt = stay.name;
    }
  };
  reserveForm.addEventListener('input', updateSummary);
  reserveForm.addEventListener('change', updateSummary);
  updateSummary();

  // 確認・完了の一覧（入力された文字は textContent で入れる）
  const fillList = (list, rows) => {
    list.replaceChildren(...rows.map(([dt, dd]) => {
      const row = document.createElement('div');
      row.className = 'sd-table__row';
      const term = document.createElement('dt');
      term.textContent = dt;
      const desc = document.createElement('dd');
      desc.textContent = dd;
      row.append(term, desc);
      return row;
    }));
  };
  const rows = () => [
    ['宿', getStay().name],
    ['日程', dateText()],
    ['人数', guestText()],
    ['お名前', `${f.name.value.trim()}（${f.kana.value.trim()}）`],
    ['メールアドレス', f.email.value.trim()],
    ['電話番号', f.tel.value.trim()],
    ['到着予定時刻', `${f.arrival.value}ごろ`],
    ['ご要望', f.request.value.trim() || 'なし'],
  ];

  // 画面の切り替え
  const setStep = (step) => {
    stepItems.forEach((item, i) => {
      if (i === step - 1) {
        item.setAttribute('aria-current', 'step');
      } else {
        item.removeAttribute('aria-current');
      }
      item.classList.toggle('is-done', i < step - 1);
    });
  };
  const show = (panel, step) => {
    [reserveForm, confirmPanel, donePanel].forEach((p) => {
      p.hidden = p !== panel;
    });
    setStep(step);
    window.scrollTo({ top: 0 });
    const title = panel.querySelector('.reserve-panel__title');
    if (title) title.focus({ preventScroll: true });
  };

  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = Object.keys(rules).filter((name) => {
      touched.add(name);
      return !validate(name);
    });
    if (invalid.length) {
      const first = controlsOf(invalid[0])[0];
      first.scrollIntoView({ block: 'center' });
      first.focus({ preventScroll: true });
      return;
    }
    fillList(document.querySelector('.js-confirm-list'), rows());
    document.querySelector('.js-confirm-total').textContent = yen(totalOf(getStay()));
    show(confirmPanel, 2);
  });

  document.querySelector('.js-back').addEventListener('click', () => show(reserveForm, 1));

  document.querySelector('.js-confirm').addEventListener('click', () => {
    const number = `NG${f.date.value.replace(/-/g, '').slice(2)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    document.querySelector('.js-done-number').textContent = number;
    document.querySelector('.js-done-email').textContent = f.email.value.trim();
    fillList(document.querySelector('.js-done-list'), rows().slice(0, 3));
    show(donePanel, 3);
  });
}

// 横にスライドするカード（スマホ）：1枚ずつ見せ、写真の左右の矢印・スワイプ・マウスのドラッグで切り替える
document.querySelectorAll('.js-slider').forEach((slider) => {
  const wrap = slider.closest('.js-slider-wrap');
  const prev = wrap.querySelector('.js-slider-prev');
  const next = wrap.querySelector('.js-slider-next');
  const current = wrap.querySelector('.js-slider-current');
  const cards = slider.children;

  // カード1枚ぶんの移動量（カードの幅＋すき間）
  const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : slider.clientWidth);
  const indexNow = () => Math.round(slider.scrollLeft / step());

  const goTo = (index) => {
    const i = Math.max(0, Math.min(cards.length - 1, index));
    slider.scrollTo({ left: i * step(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };
  prev.addEventListener('click', () => goTo(indexNow() - 1));
  next.addEventListener('click', () => goTo(indexNow() + 1));

  // 何枚目かの表示と、端での矢印の無効化
  const update = () => {
    const i = indexNow();
    current.textContent = i + 1;
    prev.disabled = i <= 0;
    next.disabled = i >= cards.length - 1;
  };
  slider.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // 指で触るときはブラウザに任せ、マウスのときだけドラッグで動かす
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  slider.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || slider.scrollWidth <= slider.clientWidth) return;
    isDown = true;
    startX = e.clientX;
    startScroll = slider.scrollLeft;
    moved = false;
  });

  slider.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    // 少し動かしてから捕まえる（押した瞬間に捕まえると、ただのクリックがカードのリンクに届かなくなる）
    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      slider.classList.add('is-dragging');
      slider.setPointerCapture(e.pointerId);
    }
    if (moved) slider.scrollLeft = startScroll - dx;
  });

  const endDrag = (e) => {
    isDown = false;
    slider.classList.remove('is-dragging');
    if (slider.hasPointerCapture(e.pointerId)) slider.releasePointerCapture(e.pointerId);
  };
  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointercancel', endDrag);

  // 写真やリンクをつかむと、ブラウザ標準の「写真をドラッグして持ち出す」動きが始まり、
  // スライドが途中で打ち切られる（pointercancel）ので、標準のドラッグは止める
  slider.addEventListener('dragstart', (e) => e.preventDefault());

  // ドラッグしたあとは、カードのリンクを開かない
  slider.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      moved = false;
    }
  }, true);
});

// STAY DETAIL（スマホ）：FVの1画面目を過ぎたら、画面の下に予約ボタンを出す
const fixedCta = document.querySelector('.js-fixed-cta');

if (fixedCta) {
  const updateFixedCta = () => {
    fixedCta.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.8);
  };

  window.addEventListener('scroll', updateFixedCta, { passive: true });
  updateFixedCta();
}

// メインビジュアル：今日の日付と時刻
const clock = document.querySelector('.js-clock');

if (clock) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const pad = (n) => String(n).padStart(2, '0');

  const renderClock = () => {
    const now = new Date();
    clock.textContent = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${days[now.getDay()]} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    clock.dateTime = now.toISOString();
  };

  renderClock();
  setInterval(renderClock, 30000);
}

// スマホ用メニューの開閉
const menuBtn = document.querySelector('.menu-btn');
const gnav = document.getElementById('gnav');

if (menuBtn && gnav) {
  const setMenuOpen = (isOpen) => {
    document.body.classList.toggle('is-menu-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  };

  menuBtn.addEventListener('click', () => {
    setMenuOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  // リンクを押したら閉じる
  gnav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  // PC幅になったら閉じる
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) setMenuOpen(false);
  });
}
