import { useState, useEffect } from "react";

/* ─── Global Token Counter (module-level) ─── */
function getNextToken() {
  const current = parseInt(localStorage.getItem("mandi_token_counter") || "0", 10);
  const next = current + 1;
  localStorage.setItem("mandi_token_counter", String(next));
  return next;
}
function generateFarmerId() {
  return "FARM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
function generateBookingId() {
  return "BKG-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

const LANGUAGES = ["English", "Hindi", "Punjabi", "Marathi", "Gujarati", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Odia", "Urdu", "Assamese"];

const TRANSLATIONS = {
  Punjabi: {
    farmerPortal: "ਕਿਸਾਨ ਪੋਰਟਲ", login: "ਲਾਗਇਨ", language: "ਭਾਸ਼ਾ", aadhaarNumber: "ਆਧਾਰ ਨੰਬਰ",
    fetchingPhone: "ਫ਼ੋਨ ਨੰਬਰ ਲਿਆਂਦਾ ਜਾ ਰਿਹਾ ਹੈ…", sendingOtp: "OTP ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ…", enterOtp: "OTP ਦਰਜ ਕਰੋ",
    verifyLogin: "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਲਾਗਇਨ ਕਰੋ", newFarmer: "ਨਵਾਂ ਕਿਸਾਨ?", register: "ਰਜਿਸਟਰ ਕਰੋ",
    overview: "ਸੰਖੇਪ ਜਾਣਕਾਰੀ", bookASlot: "ਸਲਾਟ ਬੁੱਕ ਕਰੋ", liveStatus: "ਲਾਈਵ ਸਥਿਤੀ", payments: "ਭੁਗਤਾਨ",
    myCommodities: "ਮੇਰੀ ਉਪਜ", fileComplaint: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ", viewProfile: "ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ",
    totalSold: "ਕੁੱਲ ਵੇਚੀ ਗਈ ਉਪਜ", totalEarnings: "ਕੁੱਲ ਕਮਾਈ", openComplaints: "ਖੁੱਲ੍ਹੀਆਂ ਸ਼ਿਕਾਇਤਾਂ",
    yourToken: "ਤੁਹਾਡਾ ਟੋਕਨ", bookNewSlot: "ਨਵਾਂ ਸਲਾਟ ਬੁੱਕ ਕਰੋ", yourBookings: "ਤੁਹਾਡੀਆਂ ਬੁਕਿੰਗਾਂ",
    cancel: "ਰੱਦ ਕਰੋ", payCash: "ਨਕਦ ਭੁਗਤਾਨ", payUpi: "UPI ਰਾਹੀਂ ਭੁਗਤਾਨ", back: "← ਵਾਪਸ",
    headOfPanchayat: "ਪੰਚਾਇਤ ਮੁਖੀ", secOfPanchayat: "ਪੰਚਾਇਤ ਸਕੱਤਰ"
  },
  Tamil: {
    farmerPortal: "விவசாயி போர்டல்", login: "உள்நுழைவு", language: "மொழி", aadhaarNumber: "ஆதார் எண்",
    fetchingPhone: "தொலைபேசி எண்ணைப் பெறுகிறது…", sendingOtp: "OTP அனுப்பப்படுகிறது…", enterOtp: "OTP ஐ உள்ளிடவும்",
    verifyLogin: "சரிபார்த்து உள்நுழையவும்", newFarmer: "புதிய விவசாயி?", register: "பதிவு செய்யவும்",
    overview: "மேலோட்டம்", bookASlot: "ஸ்லாட் பதிவு செய்யவும்", liveStatus: "நேரடி நிலை", payments: "பணம் செலுத்துதல்",
    myCommodities: "எனது பொருட்கள்", fileComplaint: "புகார் அளிக்கவும்", viewProfile: "சுயவிவரத்தைக் காண்க",
    totalSold: "மொத்தம் விற்ற பொருட்கள்", totalEarnings: "மொத்த வருமானம்", openComplaints: "திறந்த புகார்கள்",
    yourToken: "உங்கள் டோக்கன்", bookNewSlot: "புதிய ஸ்லாட் பதிவு செய்யவும்", yourBookings: "உங்கள் முன்பதிவுகள்",
    cancel: "ரத்து செய்", payCash: "பணமாக செலுத்து", payUpi: "UPI மூலம் செலுத்து", back: "← பின்",
    headOfPanchayat: "பஞ்சாயத்து தலைவர்", secOfPanchayat: "பஞ்சாயத்து செயலாளர்"
  },
  English: {
    farmerPortal: "Farmer Portal", login: "Login", language: "Language", aadhaarNumber: "Aadhaar Number",
    fetchingPhone: "Fetching linked phone number…", sendingOtp: "Sending OTP…", enterOtp: "Enter OTP",
    verifyLogin: "Verify & Login", newFarmer: "New farmer?", register: "Register",
    overview: "Overview", bookASlot: "Book a Slot", liveStatus: "Live Status", payments: "Payments",
    myCommodities: "My Commodities", fileComplaint: "File Complaint", viewProfile: "View Profile",
    totalSold: "Total commodities sold", totalEarnings: "Total earnings", openComplaints: "Open complaints",
    yourToken: "Your Token", bookNewSlot: "Book a New Slot", yourBookings: "Your Bookings",
    cancel: "Cancel", payCash: "Pay in Cash", payUpi: "Pay via UPI", back: "← Back",
    headOfPanchayat: "Head of Panchayat", secOfPanchayat: "Sec of Panchayat"
  },
  Hindi: {
    farmerPortal: "किसान पोर्टल", login: "लॉगिन", language: "भाषा", aadhaarNumber: "आधार नंबर",
    fetchingPhone: "फ़ोन नंबर लाया जा रहा है…", sendingOtp: "OTP भेजा जा रहा है…", enterOtp: "OTP दर्ज करें",
    verifyLogin: "सत्यापित करें और लॉगिन करें", newFarmer: "नए किसान?", register: "पंजीकरण करें",
    overview: "अवलोकन", bookASlot: "स्लॉट बुक करें", liveStatus: "लाइव स्थिति", payments: "भुगतान",
    myCommodities: "मेरी उपज", fileComplaint: "शिकायत दर्ज करें", viewProfile: "प्रोफ़ाइल देखें",
    totalSold: "कुल बेची गई उपज", totalEarnings: "कुल कमाई", openComplaints: "खुली शिकायतें",
    yourToken: "आपका टोकन", bookNewSlot: "नया स्लॉट बुक करें", yourBookings: "आपकी बुकिंग",
    cancel: "रद्द करें", payCash: "नकद भुगतान", payUpi: "UPI से भुगतान", back: "← वापस",
    headOfPanchayat: "पंचायत प्रमुख", secOfPanchayat: "पंचायत सचिव"
  }
};

function t(lang, key) {
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.English[key] || key;
}

const inputStyle = {
  width: "100%", padding: "14px", fontSize: 16, borderRadius: 8,
  border: "1px solid #d1d5db", marginBottom: 12, boxSizing: "border-box"
};

const CITIES = [
  { city: "Delhi", mandis: [{ name: "Azadpur Mandi, Delhi", commodity: "Wheat", slotsLeft: 12 }, { name: "Najafgarh Mandi, Delhi", commodity: "Vegetables", slotsLeft: 9 }] },
  { city: "Mumbai", mandis: [{ name: "Vashi APMC, Mumbai", commodity: "Rice", slotsLeft: 8 }, { name: "Dadar Mandi, Mumbai", commodity: "Fruits", slotsLeft: 14 }] },
  { city: "Bangalore", mandis: [{ name: "Yeshwantpur APMC, Bangalore", commodity: "Vegetables", slotsLeft: 6 }, { name: "K R Market, Bangalore", commodity: "Flowers", slotsLeft: 11 }] },
  { city: "Hyderabad", mandis: [{ name: "Bowenpally Market, Hyderabad", commodity: "Vegetables", slotsLeft: 10 }, { name: "Gaddiannaram Mandi, Hyderabad", commodity: "Fruits", slotsLeft: 7 }] },
  { city: "Chennai", mandis: [{ name: "Koyambedu Market, Chennai", commodity: "Rice", slotsLeft: 15 }, { name: "Pallavaram Mandi, Chennai", commodity: "Vegetables", slotsLeft: 9 }] },
  { city: "Lucknow", mandis: [{ name: "Dubagga Mandi, Lucknow", commodity: "Wheat", slotsLeft: 13 }, { name: "Sitapur Road Mandi, Lucknow", commodity: "Sugarcane", slotsLeft: 5 }] },
  { city: "Bareilly", mandis: [{ name: "Bareilly Mandi Samiti", commodity: "Wheat", slotsLeft: 8 }, { name: "Faridpur Mandi, Bareilly", commodity: "Sugarcane", slotsLeft: 6 }] },
  { city: "Odisha", mandis: [{ name: "Unit-1 Mandi, Bhubaneswar", commodity: "Rice", slotsLeft: 10 }, { name: "Berhampur Mandi, Odisha", commodity: "Jute", slotsLeft: 7 }] },
  { city: "Assam", mandis: [{ name: "Fancy Bazar Mandi, Guwahati", commodity: "Jute", slotsLeft: 9 }, { name: "Silchar Mandi, Assam", commodity: "Tea", slotsLeft: 4 }] },
  { city: "Kanpur", mandis: [{ name: "Naveen Mandi Sthal, Kanpur", commodity: "Wheat", slotsLeft: 11 }, { name: "Chakeri Mandi, Kanpur", commodity: "Vegetables", slotsLeft: 6 }] },
  { city: "Tamil Nadu", mandis: [{ name: "Madurai Mandi, Tamil Nadu", commodity: "Cotton", slotsLeft: 8 }, { name: "Coimbatore Mandi, Tamil Nadu", commodity: "Cotton", slotsLeft: 10 }] },
  { city: "Pune", mandis: [{ name: "Gultekdi Market, Pune", commodity: "Wheat", slotsLeft: 20 }, { name: "Khadki Mandi, Pune", commodity: "Onion", slotsLeft: 12 }] },
];

const SALES_HISTORY = [
  { commodity: "Wheat", mandi: "Azadpur Mandi, Delhi", qty: 230, amount: 18400, date: "Aug 20" },
  { commodity: "Rice", mandi: "Vashi APMC, Mumbai", qty: 180, amount: 9200, date: "Aug 10" },
  { commodity: "Wheat", mandi: "Gultekdi Market, Pune", qty: 300, amount: 24000, date: "Jul 29" },
  { commodity: "Cotton", mandi: "Koyambedu Market, Chennai", qty: 150, amount: 13500, date: "Jul 15" },
  { commodity: "Jute", mandi: "Fancy Bazar Mandi, Guwahati", qty: 90, amount: 7200, date: "Jul 2" },
  { commodity: "Onion", mandi: "Yeshwantpur APMC, Bangalore", qty: 130, amount: 6800, date: "Jun 25" },
];

function aggregate(history, field) {
  const map = {};
  history.forEach((h) => { map[h.commodity] = (map[h.commodity] || 0) + h[field]; });
  return map;
}

/* ─── Reusable UI Components ─── */

function Card({ children, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
      padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", cursor: onClick ? "pointer" : "default"
    }}>{children}</div>
  );
}

function Button({ children, onClick, variant = "primary", disabled = false, style = {} }) {
  const colors = {
    primary: { background: "#3b82f6", color: "#fff" },
    secondary: { background: "#f3f4f6", color: "#111827", border: "1px solid #d1d5db" },
    danger: { background: "#ef4444", color: "#fff" }
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "12px 20px", borderRadius: 8, border: "none", fontSize: 15,
      fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
      width: "100%", opacity: disabled ? 0.5 : 1, ...colors[variant], ...style
    }}>{children}</button>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div style={{ background: "#fff", padding: "16px 0", borderBottom: "1px solid #e5e7eb", marginBottom: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

function Stepper({ stages, activeIndex }) {
  return (
    <div style={{ display: "flex", background: "#fff", padding: "24px 8px" }}>
      {stages.map((label, index) => {
        const isDone = index < activeIndex, isActive = index === activeIndex;
        return (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: isDone ? "2px solid #22c55e" : isActive ? "2px solid #3b82f6" : "2px solid #d1d5db",
              background: isDone ? "#22c55e" : "#fff",
              color: isDone ? "#fff" : isActive ? "#3b82f6" : "#9ca3af",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600
            }}>{isDone ? "✓" : index + 1}</div>
            <span style={{ marginTop: 6, fontSize: 12, color: "#374151", textAlign: "center" }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Eye Toggle Icon ─── */
function EyeIcon({ visible, onClick }) {
  return (
    <span onClick={onClick} style={{
      position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
      cursor: "pointer", fontSize: 16, color: "#6b7280", userSelect: "none", fontWeight: 700
    }}>{visible ? "◉" : "◎"}</span>
  );
}

/* ─── Login Screen ─── */
function LoginScreen({ language, setLanguage, onNext, onRegister }) {
  const [step, setStep] = useState("aadhaar");
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [fetchingPhone, setFetchingPhone] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpError, setOtpError] = useState("");

  const handleAadhaarChange = (v) => {
    const val = v.replace(/\D/g, "").slice(0, 12);
    setAadhaar(val); setPhone("");
    if (/^\d{12}$/.test(val)) {
      setFetchingPhone(true);
      setTimeout(() => { setPhone("98" + val.slice(-8)); setFetchingPhone(false); setStep("confirmPhone"); }, 700);
    }
  };

  const startOtpCountdown = () => {
    const code = generateOtp();
    setGeneratedOtp(code);
    const delay = Math.floor(Math.random() * 6) + 10;
    setOtpCountdown(delay);
    setStep("waitingOtp");
    let remaining = delay;
    const timer = setInterval(() => {
      remaining -= 1;
      setOtpCountdown(remaining);
      if (remaining <= 0) { clearInterval(timer); setStep("otp"); }
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) onNext();
    else setOtpError("Incorrect OTP. Please try again.");
  };

  const isValidManualPhone = /^[6-9]\d{9}$/.test(manualPhone);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <PageHeader title={t(language, "login")} subtitle={t(language, "farmerPortal")} />
      <label style={{ fontSize: 13, color: "#374151" }}>{t(language, "language")}</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
        {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
      </select>

      {step === "aadhaar" && (
        <>
          <label style={{ fontSize: 13, color: "#374151" }}>{t(language, "aadhaarNumber")}</label>
          <input value={aadhaar} onChange={(e) => handleAadhaarChange(e.target.value)} style={inputStyle} placeholder="12-digit Aadhaar number" />
          {fetchingPhone && <p style={{ fontSize: 12, color: "#3b82f6", marginTop: -8 }}>{t(language, "fetchingPhone")}</p>}
        </>
      )}

      {step === "confirmPhone" && (
        <>
          <Card>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>We found this number linked to your Aadhaar:</p>
            <p style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 700 }}>{phone}</p>
          </Card>
          <p style={{ fontSize: 14, margin: "12px 0 8px" }}>Is this number correct?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={startOtpCountdown}>Proceed</Button>
            <Button variant="secondary" onClick={() => { setStep("manualPhone"); setManualPhone(""); }}>Change Number</Button>
          </div>
        </>
      )}

      {step === "manualPhone" && (
        <>
          <label style={{ fontSize: 13, color: "#374151" }}>Enter Phone Number</label>
          <input value={manualPhone} onChange={(e) => setManualPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} style={inputStyle} placeholder="10-digit phone number" />
          <Button disabled={!isValidManualPhone} onClick={startOtpCountdown}>Send OTP</Button>
        </>
      )}

      {step === "waitingOtp" && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}>{t(language, "sendingOtp")}</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "#3b82f6" }}>{otpCountdown}s</p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>Please wait while we send the OTP to your number…</p>
        </div>
      )}

      {step === "otp" && (
        <>
          <Card>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>📩 SMS from MANDI-ALERT</p>
            <p style={{ margin: "6px 0 0", fontSize: 14 }}>Your OTP is <b>{generatedOtp}</b>. Do not share this code.</p>
          </Card>
          <label style={{ fontSize: 13, color: "#374151", marginTop: 12, display: "block" }}>{t(language, "enterOtp")}</label>
          <div style={{ position: "relative" }}>
            <input value={otp} maxLength={6} type={showOtp ? "text" : "password"}
              onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setOtpError(""); }}
              style={{ ...inputStyle, paddingRight: 44 }} />
            <EyeIcon visible={showOtp} onClick={() => setShowOtp(!showOtp)} />
          </div>
          {otpError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: -8 }}>{otpError}</p>}
          <Button onClick={verifyOtp}>{t(language, "verifyLogin")}</Button>
        </>
      )}

      <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
        {t(language, "newFarmer")}{" "}
        <span onClick={onRegister} style={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>{t(language, "register")}</span>
      </p>
    </div>
  );
}

/* ─── Register Screen ─── */
function RegisterScreen({ language, onNext }) {
  const [name, setName] = useState(""), [sd, setSd] = useState(""), [commodity, setCommodity] = useState("");
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <PageHeader title={t(language, "register")} subtitle="New Farmer" />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input placeholder="State / District" value={sd} onChange={(e) => setSd(e.target.value)} style={inputStyle} />
      <input placeholder="Primary Commodity" value={commodity} onChange={(e) => setCommodity(e.target.value)} style={inputStyle} />
      <Button onClick={onNext}>{t(language, "register")}</Button>
    </div>
  );
}

/* ─── Book a Slot Flow with Auto-Cancellation ─── */
function BookSlotFlow({ language, bookings, setBookings }) {
  const [step, setStep] = useState("list");
  const [city, setCity] = useState(null);
  const [mandi, setMandi] = useState(null);
  const [slot, setSlot] = useState(null);
  const [commodityToShip, setCommodityToShip] = useState("");
  const [bookingReason, setBookingReason] = useState("");

  const slots = [
    { date: "Aug 28", time: "9-11 AM", wait: "25 min" },
    { date: "Aug 28", time: "2-4 PM", wait: "40 min" },
    { date: "Aug 29", time: "9-11 AM", wait: "15 min" }
  ];

  const goToBooking = () => {
    if (bookings.length > 0) { setCommodityToShip(""); setBookingReason(""); setStep("preBook"); }
    else { setStep("city"); }
  };

  const confirmPreBook = () => { if (!commodityToShip || !bookingReason) return; setStep("city"); };

  const confirmBooking = () => {
    let updatedBookings = [...bookings];
    let autoCancelled = false;
    const sameBooking = bookings.find((b) => b.commodityToShip === commodityToShip);
    if (sameBooking) { updatedBookings = updatedBookings.filter((b) => b.id !== sameBooking.id); autoCancelled = true; }
    const bookedOn = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        updatedBookings.push({
      id: Date.now(), bookingId: generateBookingId(), mandi: mandi.name, commodityToShip, bookingReason,
      bookedOn, bookedFor: `${slot.date} • ${slot.time}`, ...slot, token: updatedBookings.length + 1
    });
    setBookings(updatedBookings);
    setCity(null); setMandi(null); setSlot(null); setCommodityToShip(""); setBookingReason("");
    setStep("list");
  };

  const cancelBooking = (id) => setBookings(bookings.filter((b) => b.id !== id));

  if (step === "list") {
    return (
      <div style={{ maxWidth: 460 }}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>{t(language, "yourBookings")}</p>
        {bookings.length === 0 && <p style={{ fontSize: 13, color: "#6b7280" }}>No active bookings.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bookings.map((b) => (
            <Card key={b.id}>
              <p style={{ margin: 0, fontWeight: 700 }}>{b.mandi}</p>
              <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Booked on: {b.bookedOn} • Booked for: {b.bookedFor}</p>
              <p style={{ margin: "4px 0", fontSize: 13, color: "#374151" }}>Commodity to be transferred: {b.commodityToShip}</p>
              <p style={{ margin: "4px 0", fontSize: 12, color: "#9ca3af" }}>Booking ID: {b.bookingId}</p>
              <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Token {b.token}</p>
              <div style={{ marginTop: 8 }}><Button variant="danger" onClick={() => cancelBooking(b.id)}>{t(language, "cancel")}</Button></div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16 }}><Button onClick={goToBooking}>{t(language, "bookNewSlot")}</Button></div>
      </div>
    );
  }

  if (step === "preBook") {
    return (
      <div style={{ maxWidth: 460 }}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>Additional Booking Details</p>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>You already have an active booking. Please provide details for this new booking.</p>
        <label style={{ fontSize: 13, color: "#374151" }}>Commodity to be shipped</label>
        <input value={commodityToShip} onChange={(e) => setCommodityToShip(e.target.value)} style={inputStyle} placeholder="e.g. Wheat, Rice" />
        <label style={{ fontSize: 13, color: "#374151" }}>Reason for second booking / Same commodity to be transferred?</label>
        <input value={bookingReason} onChange={(e) => setBookingReason(e.target.value)} style={inputStyle} placeholder="e.g. Additional quantity, Different mandi" />
        <Button onClick={confirmPreBook} disabled={!commodityToShip || !bookingReason}>Continue</Button>
      </div>
    );
  }

  if (step === "city") {
    return (
      <div style={{ maxWidth: 460 }}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>Choose a city</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CITIES.map((c) => (
            <div key={c.city} onClick={() => { setCity(c); setStep("mandi"); }}>
              <Card><p style={{ margin: 0, fontWeight: 600 }}>{c.city}</p></Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "mandi") {
    return (
      <div style={{ maxWidth: 460 }}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>{city.city} — choose a mandi</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {city.mandis.map((m) => (
            <div key={m.name} onClick={() => { setMandi(m); setStep("slot"); }}>
              <Card>
                <p style={{ margin: 0, fontWeight: 700 }}>{m.name}</p>
                <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>{m.commodity} • {m.slotsLeft} slots left</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "slot") {
    return (
      <div style={{ maxWidth: 460 }}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>{mandi.name} — pick a slot</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {slots.map((s, i) => (
            <div key={i} onClick={() => { setSlot(s); confirmBooking(); }}>
              <Card>
                <p style={{ margin: 0, fontWeight: 600 }}>{s.date} • {s.time}</p>
                <p style={{ margin: "4px 0", fontSize: 13, color: "#3b82f6" }}>AI predicted wait: {s.wait}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

/* ─── Live Status Tab ─── */
function LiveStatusTab({ userToken, checkedIn, paymentMethod, paymentComplete }) {
  const stages = ["Registered", "Checked-In", "Quality Check", "Accepted", "Payment"];
  const [activeIndex, setActiveIndex] = useState(1); // Registered is done (green)
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => setCoords({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) }),
        () => {}
      );
    }
  }, []);

  useEffect(() => {
    if (!checkedIn) { setActiveIndex(1); return; }
    const id = setInterval(() => {
      setActiveIndex((i) => {
        if (i >= 4) {
          if (paymentMethod === "upi" && paymentComplete) return 5;
          return i;
        }
        return i + 1;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [checkedIn, paymentMethod, paymentComplete]);

  const showPaymentWarning = paymentMethod === "cash" && activeIndex >= 4 && !paymentComplete;

  return (
    <div style={{ maxWidth: 420 }}>
      <Stepper stages={stages} activeIndex={activeIndex} />
      <Card>
        <p style={{ margin: 0, fontWeight: 600 }}>Estimated remaining: {Math.max(0, (stages.length - 1 - Math.min(activeIndex, stages.length - 1))) * 20} min</p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Currently serving: Token 1 • Your token: {userToken}</p>
      </Card>
      {showPaymentWarning && (
        <p style={{ fontSize: 14, color: "#f59e0b", fontWeight: 600, textAlign: "center", marginTop: 12 }}>⏳ Waiting for payment approval</p>
      )}
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 12 }}>{coords ? `Tracking location: ${coords.lat}, ${coords.lng}` : "Detecting location…"}</p>
    </div>
  );
}

/* ─── Payments Tab ─── */
function PaymentsTab({ language, onPaymentComplete, cashConfirmed }) {
  const [method, setMethod] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [showCompleteText, setShowCompleteText] = useState(false);
  const [transferredGreen, setTransferredGreen] = useState(false);
  const [qrPattern] = useState(() => Array.from({ length: 49 }, () => Math.random() > 0.5));
  const displayIndex = transferredGreen ? 3 : activeIndex;

  const finishPayment = (m) => {
    setProcessing(false);
    setActiveIndex(2);
    setShowCompleteText(true);
    onPaymentComplete(m);
    setTimeout(() => setTransferredGreen(true), 5000);
  };

  const selectMethod = (m) => {
    setMethod(m); setProcessing(true);
    if (m === "upi") setTimeout(() => finishPayment("upi"), 4000);
  };

  useEffect(() => {
    if (method === "cash" && cashConfirmed && processing) finishPayment("cash");
  }, [cashConfirmed, method, processing]);

  return (
    <div style={{
      maxWidth: 420, padding: transferredGreen ? 16 : 0, borderRadius: 12,
      background: transferredGreen ? "#f0fdf4" : "transparent", border: transferredGreen ? "1px solid #bbf7d0" : "none", transition: "background 0.4s"
    }}>
      <Stepper stages={["Sanctioned", "Initiated", "Transferred"]} activeIndex={displayIndex} />
      <Card>
        <p style={{ margin: 0, fontWeight: 600 }}>Amount: ₹18,400</p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Quantity accepted: 230 kg • Grade: A</p>
      </Card>
      {!method && (
        <>
          <p style={{ fontWeight: 600, marginTop: 16, fontSize: 14 }}>Preferred payment method</p>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <Button variant="secondary" onClick={() => selectMethod("cash")}>{t(language, "payCash")}</Button>
            <Button variant="secondary" onClick={() => selectMethod("upi")}>{t(language, "payUpi")}</Button>
          </div>
        </>
      )}
      {method === "upi" && processing && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Scan to pay via UPI</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", width: 140, height: 140, margin: "0 auto", border: "1px solid #d1d5db", padding: 8 }}>
            {qrPattern.map((f, i) => <div key={i} style={{ background: f ? "#111827" : "#fff" }} />)}
          </div>
          <p style={{ fontSize: 13, color: "#3b82f6", marginTop: 12 }}>Waiting for payment confirmation…</p>
        </div>
      )}
      {method === "cash" && processing && (
        <div style={{ marginTop: 16 }}>
          <Card><p style={{ margin: 0, fontWeight: 600 }}>Amount to be paid: ₹18,400</p></Card>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "8px 0 12px", textAlign: "center" }}>Waiting for Sec of Panchayat to confirm cash receipt</p>
        </div>
      )}
      {showCompleteText && <p style={{ marginTop: 16, color: "#16a34a", fontWeight: 700, textAlign: "center" }}>Payment complete ✓</p>}
    </div>
  );
}

/* ─── My Commodities Tab ─── */
function MyCommoditiesTab() {
  const [selected, setSelected] = useState(null);
  const totals = aggregate(SALES_HISTORY, "qty");
  if (selected) {
    const entries = SALES_HISTORY.filter((h) => h.commodity === selected);
    return (
      <div style={{ maxWidth: 460 }}>
        <p onClick={() => setSelected(null)} style={{ color: "#3b82f6", cursor: "pointer", marginBottom: 12 }}>← Back</p>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>{selected}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {entries.map((e, i) => (
            <Card key={i}>
              <p style={{ margin: 0, fontWeight: 600 }}>{e.mandi}</p>
              <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>{e.qty} kg • {e.date}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#22c55e", fontWeight: 600 }}>₹{e.amount.toLocaleString()}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 460, display: "flex", flexDirection: "column", gap: 10 }}>
      {Object.entries(totals).map(([commodity, qty]) => (
        <div key={commodity} onClick={() => setSelected(commodity)}>
          <Card><p style={{ margin: 0, fontWeight: 700 }}>{commodity} — {qty} kg</p></Card>
        </div>
      ))}
    </div>
  );
}

/* ─── Complaint Tab ─── */
function ComplaintTab() {
  const [issueType, setIssueType] = useState("Payment Delay");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <Card>
        <p style={{ margin: 0, fontWeight: 700 }}>GRV-2026-0847</p>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "8px 0 0" }}>Filed successfully.</p>
      </Card>
    );
  }
  return (
    <div style={{ maxWidth: 400 }}>
      <select value={issueType} onChange={(e) => setIssueType(e.target.value)} style={inputStyle}>
        <option>Payment Delay</option><option>Wrong Quantity</option><option>Other</option>
      </select>
      <textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, 200))} rows={4} style={{ ...inputStyle, resize: "none" }} placeholder="Describe the issue (max 200 chars)" />
      <Button onClick={() => setSubmitted(true)}>Submit Grievance</Button>
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({ userToken }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("farmer@123");
  const [newPassword, setNewPassword] = useState("");
  const [lastChanged, setLastChanged] = useState("Aug 13th, 2020");
  const [commodities, setCommodities] = useState("Wheat, Rice, Cotton, Jute");
  const [newCommodities, setNewCommodities] = useState("");
  const [editCommodities, setEditCommodities] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Aahana", dob: "17th November 2004", placeOfWorking: "Lucknow",
    commoditiesSold: "Wheat, Rice, Cotton, Jute", transferPlaces: "Mumbai, Delhi, Pune, Gujarat, Tamil Nadu",
    workingUnder: "Seher Panchayat", aadhaar: "•••• •••• 1234", token: userToken || 1
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const startEdit = (field) => { setEditField(field); setTempValue(profile[field]); };
  const saveEdit = () => { setProfile({ ...profile, [editField]: tempValue }); setEditField(null); };
  const cancelEdit = () => { setEditField(null); setTempValue(""); };

  const updatePassword = () => {
    if (!newPassword) return;
    setPassword(newPassword);
    setLastChanged(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }));
    setNewPassword(""); setEditPassword(false);
  };
  const updateCommodities = () => {
    if (!newCommodities) return;
    setCommodities(newCommodities);
    setProfile({ ...profile, commoditiesSold: newCommodities });
    setNewCommodities(""); setEditCommodities(false);
  };

  const fieldLabel = (label) => (
    <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
  );

  const renderField = (label, fieldKey, editable = true) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {fieldLabel(label)}
        {editable && editField !== fieldKey && (
          <span onClick={() => startEdit(fieldKey)} style={{ fontSize: 12, color: "#3b82f6", cursor: "pointer", fontWeight: 500 }}>✎ Edit</span>
        )}
        {editable && editField === fieldKey && (
          <div style={{ display: "flex", gap: 8 }}>
            <span onClick={saveEdit} style={{ fontSize: 12, color: "#22c55e", cursor: "pointer", fontWeight: 600 }}>✓ Save</span>
            <span onClick={cancelEdit} style={{ fontSize: 12, color: "#ef4444", cursor: "pointer", fontWeight: 500 }}>✕ Cancel</span>
          </div>
        )}
      </div>
      {editField === fieldKey ? (
        <input value={tempValue} onChange={(e) => setTempValue(e.target.value)}
          style={{ width: "100%", padding: "8px 10px", fontSize: 14, borderRadius: 6, border: "1px solid #3b82f6", boxSizing: "border-box" }} autoFocus />
      ) : (
        <p style={{ margin: 0, fontSize: 15, color: "#111827", fontWeight: 600 }}>{profile[fieldKey]}</p>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 460 }}>
      <Card>
        <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 20, color: "#111827", borderBottom: "2px solid #f3f4f6", paddingBottom: 12 }}>👤 {profile.name}</p>
        {renderField("Name", "name")}
        {renderField("Date of Birth", "dob")}
        {renderField("Place of Working", "placeOfWorking")}
        {renderField("Commodities Sold", "commoditiesSold")}
        {renderField("Place of Commodity Transfers", "transferPlaces")}
        {renderField("Working Under", "workingUnder")}
        <div style={{ marginBottom: 18 }}>
          {fieldLabel("Aadhaar Number")}
          <p style={{ margin: 0, fontSize: 15, color: "#111827", fontWeight: 600 }}>{profile.aadhaar}</p>
        </div>
        <div style={{ marginBottom: 18 }}>
          {fieldLabel("Token")}
          <p style={{ margin: 0, fontSize: 18, color: "#3b82f6", fontWeight: 700 }}>#{userToken || 1}</p>
        </div>

        <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#374151" }}>Update Commodities</p>
            {!editCommodities && <span onClick={() => setEditCommodities(true)} style={{ fontSize: 12, color: "#3b82f6", cursor: "pointer", fontWeight: 500 }}>✎ Edit</span>}
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6b7280" }}>Current: {commodities}</p>
          {editCommodities && (
            <>
              <input placeholder="Enter new commodities (comma separated)" value={newCommodities} onChange={(e) => setNewCommodities(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", fontSize: 14, borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 8, boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <Button style={{ flex: 1 }} onClick={updateCommodities}>Save</Button>
                <Button variant="secondary" style={{ flex: 1 }} onClick={() => { setEditCommodities(false); setNewCommodities(""); }}>Cancel</Button>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#374151" }}>Password</p>
            {!editPassword && <span onClick={() => setEditPassword(true)} style={{ fontSize: 12, color: "#3b82f6", cursor: "pointer", fontWeight: 500 }}>✎ Change</span>}
          </div>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <input type={showPassword ? "text" : "password"} value={password} readOnly
              style={{ width: "100%", padding: "10px 40px 10px 12px", fontSize: 14, borderRadius: 6, border: "1px solid #d1d5db", boxSizing: "border-box", background: "#f9fafb" }} />
            <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#6b7280" }}>Last changed: {lastChanged}</p>
          {editPassword && (
            <>
              <label style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>New Password</label>
              <div style={{ position: "relative", margin: "6px 0 12px" }}>
                <input type={showNewPassword ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: "100%", padding: "10px 40px 10px 12px", fontSize: 14, borderRadius: 6, border: "1px solid #3b82f6", boxSizing: "border-box" }} />
                <EyeIcon visible={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button style={{ flex: 1 }} onClick={updatePassword}>Update Password</Button>
                <Button variant="secondary" style={{ flex: 1 }} onClick={() => { setEditPassword(false); setNewPassword(""); }}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ─── Quick Book Widget (embedded in Overview) ─── */
function QuickBookWidget({ language, bookings, setBookings }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [whatBooking, setWhatBooking] = useState("");
  const [forCommodity, setForCommodity] = useState("");
  const [city, setCity] = useState(null);
  const [mandi, setMandi] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const slots = [
    { date: "Aug 28", time: "9-11 AM", wait: "25 min" },
    { date: "Aug 28", time: "2-4 PM", wait: "40 min" },
    { date: "Aug 29", time: "9-11 AM", wait: "15 min" }
  ];

  const reset = () => {
    setOpen(false); setStep("form"); setWhatBooking(""); setForCommodity("");
    setCity(null); setMandi(null); setConfirmedBooking(null);
  };

  const confirmSlot = (slot) => {
    const bookedOn = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      const booking = {
        id: Date.now(), bookingId: generateBookingId(), mandi: mandi.name, commodityToShip: forCommodity, bookingReason: whatBooking,
      bookedOn, bookedFor: `${slot.date} • ${slot.time}`, ...slot, token: bookings.length + 1
    };
    setBookings([...bookings, booking]);
    setConfirmedBooking(booking);
    setStep("done");
  };

  if (!open) {
    return (
      <Card onClick={() => setOpen(true)}>
        <p style={{ margin: 0, fontWeight: 700 }}>+ {t(language, "bookASlot")}</p>
      </Card>
    );
  }

  return (
    <Card>
      {step === "form" && (
        <>
          <label style={{ fontSize: 13, color: "#374151" }}>What is this booking:</label>
          <input value={whatBooking} onChange={(e) => setWhatBooking(e.target.value)} style={inputStyle} placeholder="e.g. Season harvest sale" />
          <label style={{ fontSize: 13, color: "#374151" }}>For which commodity:</label>
          <input value={forCommodity} onChange={(e) => setForCommodity(e.target.value)} style={inputStyle} placeholder="e.g. Wheat" />
          <div style={{ display: "flex", gap: 10 }}>
            <Button disabled={!whatBooking || !forCommodity} onClick={() => setStep("city")}>Continue</Button>
            <Button variant="secondary" onClick={reset}>Cancel</Button>
          </div>
        </>
      )}
      {step === "city" && (
        <>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Choose a city</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CITIES.map((c) => (
              <div key={c.city} onClick={() => { setCity(c); setStep("mandi"); }}>
                <Card><p style={{ margin: 0, fontWeight: 600 }}>{c.city}</p></Card>
              </div>
            ))}
          </div>
        </>
      )}
      {step === "mandi" && (
        <>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>{city.city} — choose a mandi</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {city.mandis.map((m) => (
              <div key={m.name} onClick={() => { setMandi(m); setStep("slot"); }}>
                <Card>
                  <p style={{ margin: 0, fontWeight: 700 }}>{m.name}</p>
                  <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>{m.commodity} • {m.slotsLeft} slots left</p>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
      {step === "slot" && (
        <>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>{mandi.name} — pick a slot</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {slots.map((s, i) => (
              <div key={i} onClick={() => confirmSlot(s)}>
                <Card>
                  <p style={{ margin: 0, fontWeight: 600 }}>{s.date} • {s.time}</p>
                  <p style={{ margin: "4px 0", fontSize: 13, color: "#3b82f6" }}>AI predicted wait: {s.wait}</p>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
      {step === "done" && confirmedBooking && (
        <>
          <p style={{ color: "#16a34a", fontWeight: 700, marginBottom: 8 }}>Slot booked ✓</p>
          <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{confirmedBooking.mandi} • {confirmedBooking.bookedFor} • Token {confirmedBooking.token}</p>
          <div style={{ marginTop: 12 }}><Button onClick={reset}>Done</Button></div>
        </>
      )}
    </Card>
  );
}

/* ─── Farmer Dashboard ─── */
function FarmerDashboard({ language, setLanguage, userToken, farmerStageIndex, paymentMethod, paymentComplete, cashConfirmed, onPaymentComplete }) {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [overviewView, setOverviewView] = useState("summary");
  const [bookings, setBookings] = useState([]);

  const items = [
    { key: "overview", label: t(language, "overview") },
    { key: "bookSlot", label: t(language, "bookASlot") },
    { key: "liveStatus", label: t(language, "liveStatus") },
    { key: "payments", label: t(language, "payments") },
    { key: "myCommodities", label: t(language, "myCommodities") },
    { key: "complaint", label: t(language, "fileComplaint") },
    { key: "profile", label: t(language, "viewProfile") },
  ];

  const totalQty = SALES_HISTORY.reduce((s, h) => s + h.qty, 0);
  const totalAmt = SALES_HISTORY.reduce((s, h) => s + h.amount, 0);
  const qtyByCommodity = aggregate(SALES_HISTORY, "qty");
  const amtByCommodity = aggregate(SALES_HISTORY, "amount");

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div onClick={() => setSidebarOpen(!sidebarOpen)} style={{
        position: "fixed", top: 20, left: 20, fontSize: 24, cursor: "pointer", zIndex: 20,
        background: "#fff", padding: "4px 10px", borderRadius: 8, border: "1px solid #e5e7eb"
      }}>☰</div>

      {sidebarOpen && (
        <div style={{
          position: "fixed", top: 60, left: 20, background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 20, width: 200, padding: 8
        }}>
          {items.map((item) => (
            <div key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }} style={{
              padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14,
              background: tab === item.key ? "#eff6ff" : "transparent",
              color: tab === item.key ? "#3b82f6" : "#374151", fontWeight: tab === item.key ? 600 : 400
            }}>{item.label}</div>
          ))}
        </div>
      )}

      <div style={{ padding: "80px 32px 32px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <PageHeader title={items.find((i) => i.key === tab)?.label} subtitle="Aahana" />

          {tab === "overview" && overviewView === "summary" && (
            <div>
              <p style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", margin: "0 0 16px" }}>{t(language, "yourToken")}: {userToken}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card onClick={() => setOverviewView("commodities")}><p style={{ margin: 0 }}>{t(language, "totalSold")}: <b>{totalQty} kg</b></p></Card>
                <Card onClick={() => setOverviewView("earnings")}><p style={{ margin: 0 }}>{t(language, "totalEarnings")}: <b>₹{totalAmt.toLocaleString()}</b></p></Card>
              </div>
              <div style={{ marginTop: 10 }}>
                <Card><p style={{ margin: 0 }}>{t(language, "openComplaints")}: <b>0</b></p></Card>
                </div>
                <div style={{ marginTop: 10 }}>
                </div>
                <QuickBookWidget language={language} bookings={bookings} setBookings={setBookings} />
              </div>
          )}

          {tab === "overview" && overviewView === "commodities" && (
            <div>
              <p onClick={() => setOverviewView("summary")} style={{ color: "#3b82f6", cursor: "pointer", marginBottom: 12 }}>{t(language, "back")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(qtyByCommodity).map(([c, q]) => (
                  <Card key={c}><p style={{ margin: "4px 0" }}>{c}: <b>{q} kg</b></p></Card>
                ))}
              </div>
            </div>
          )}

          {tab === "overview" && overviewView === "earnings" && (
            <div>
              <p onClick={() => setOverviewView("summary")} style={{ color: "#3b82f6", cursor: "pointer", marginBottom: 12 }}>{t(language, "back")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(amtByCommodity).map(([c, a]) => (
                  <Card key={c}><p style={{ margin: "4px 0" }}>{c}: <b>₹{a.toLocaleString()}</b></p></Card>
                ))}
              </div>
            </div>
          )}

          {tab === "bookSlot" && <BookSlotFlow language={language} bookings={bookings} setBookings={setBookings} />}
          {tab === "liveStatus" && <LiveStatusTab userToken={userToken} activeIndex={farmerStageIndex} paymentMethod={paymentMethod} paymentComplete={paymentComplete} />}
          {tab === "payments" && <PaymentsTab language={language} onPaymentComplete={onPaymentComplete} cashConfirmed={cashConfirmed} />}
          {tab === "myCommodities" && <MyCommoditiesTab />}
          {tab === "complaint" && <ComplaintTab />}
          {tab === "profile" && <ProfileTab userToken={userToken} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Head of Panchayat Screens ─── */
function HeadOfPanchayatLoginScreen({ language, onNext, onRegister }) {
  const [username, setUsername] = useState(""), [password, setPassword] = useState(""), [error, setError] = useState("");
  const tryLogin = () => {
    const storedUser = localStorage.getItem("staff_head_username");
    const storedPass = localStorage.getItem("staff_head_password");
    if (!storedUser) { onNext(); return; } // no account yet — demo fallback
    if (username === storedUser && password === storedPass) onNext();
    else setError("Incorrect username or password.");
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <PageHeader title={t(language, "headOfPanchayat")} subtitle="Mandi Admin Portal" />
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: -8 }}>{error}</p>}
      <Button onClick={tryLogin}>Login</Button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
        New {t(language, "headOfPanchayat")}? <span onClick={onRegister} style={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>Register</span>
      </p>
    </div>
  );
}

/* ─── Sec of Panchayat Screens ─── */
function SecOfPanchayatLoginScreen({ language, onNext, onRegister }) {
  const [username, setUsername] = useState(""), [password, setPassword] = useState(""), [error, setError] = useState("");
  const tryLogin = () => {
    const storedUser = localStorage.getItem("staff_sec_username");
    const storedPass = localStorage.getItem("staff_sec_password");
    if (!storedUser) { onNext(); return; }
    if (username === storedUser && password === storedPass) onNext();
    else setError("Incorrect username or password.");
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <PageHeader title={t(language, "secOfPanchayat")} subtitle="Supervisor Portal" />
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: -8 }}>{error}</p>}
      <Button onClick={tryLogin}>Login</Button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
        New {t(language, "secOfPanchayat")}? <span onClick={onRegister} style={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>Register</span>
      </p>
    </div>
  );
}

/*Head of Panchayat Dashboard Screen*/
function HeadOfPanchayatDashboardScreen({ language, farmerStageIndex, paymentMethod, paymentComplete, cashConfirmed }) {
  const stages = ["Registered", "Checked-In", "Quality Check", "Accepted", "Payment"];
  const paymentStatus = paymentMethod === "upi"
    ? (paymentComplete ? "UPI — Transferred" : "UPI — Pending")
    : paymentMethod === "cash"
      ? (cashConfirmed ? "Cash — Received" : "Cash — Awaiting confirmation")
      : "Not yet selected";

  const farmers = [
    { name: "Aahana", harvested: "230 kg", earned: "₹18,400", mandi: "Azadpur Mandi, Delhi", status: stages[farmerStageIndex], payment: paymentStatus },
    { name: "Suresh Patil", harvested: "540 kg", earned: "₹38,200", mandi: "Gultekdi Market, Pune", status: "Checked-In", payment: "UPI — Transferred" }
  ];
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <PageHeader title="Farmer Status Overview" subtitle={t(language, "headOfPanchayat")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {farmers.map((f) => (
          <Card key={f.name}>
            <p style={{ margin: 0, fontWeight: 700 }}>{f.name}</p>
            <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>{f.harvested} • {f.earned} • {f.mandi}</p>
            <p style={{ margin: 0, color: "#3b82f6", fontWeight: 600 }}>Stage: {f.status}</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Payment: {f.payment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
/*Sec of Panchayat Dashboard Screen*/ 
function SecOfPanchayatDashboardScreen({ language, farmerStageIndex, onCheckIn, onAdvanceStage, paymentMethod, cashConfirmed, onConfirmCash }) {
  const stages = ["Registered", "Checked-In", "Quality Check", "Accepted", "Payment"];
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <PageHeader title="Dashboard" subtitle={`${t(language, "secOfPanchayat")} — Azadpur Mandi, Delhi`} />
      <Card>
        <p style={{ margin: 0, fontWeight: 700 }}>Aahana — Token 1</p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Current stage: {stages[farmerStageIndex]}</p>
      </Card>

      <div style={{ marginTop: 16 }}>
        {farmerStageIndex === 0 && (
          <Card>
            <p style={{ margin: "0 0 10px" }}>Aahana has arrived at the mandi.</p>
            <Button onClick={onCheckIn}>Confirm Check-In</Button>
          </Card>
        )}
        {farmerStageIndex === 1 && (
          <Card>
            <p style={{ margin: "0 0 10px" }}>Ready for quality check.</p>
            <Button onClick={onAdvanceStage}>Mark Quality Check Done</Button>
          </Card>
        )}
        {farmerStageIndex === 2 && (
          <Card>
            <p style={{ margin: "0 0 10px" }}>Ready for acceptance.</p>
            <Button onClick={onAdvanceStage}>Mark Accepted</Button>
          </Card>
        )}
        {farmerStageIndex === 3 && paymentMethod === "cash" && !cashConfirmed && (
          <Card>
            <p style={{ margin: "0 0 10px" }}>Cash payment awaiting confirmation.</p>
            <Button onClick={onConfirmCash}>Confirm Cash Payment Received</Button>
          </Card>
        )}
        {farmerStageIndex === 3 && paymentMethod !== "cash" && (
          <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center" }}>Waiting on UPI payment (auto-confirms)</p>
        )}
        {farmerStageIndex === 4 && (
          <p style={{ color: "#16a34a", fontWeight: 600, textAlign: "center" }}>All steps complete for Aahana ✓</p>
        )}
      </div>
    </div>
  );
}

function StaffRegisterScreen({ roleLabel, roleKey, onNext }) {
  const [name, setName] = useState(""), [panchayat, setPanchayat] = useState("");
  const [username, setUsername] = useState(""), [password, setPassword] = useState("");

  const handleRegister = () => {
    localStorage.setItem(`staff_${roleKey}_username`, username);
    localStorage.setItem(`staff_${roleKey}_password`, password);
    onNext();
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <PageHeader title={`${roleLabel} Registration`} subtitle="New Staff Member" />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input placeholder="Panchayat / District" value={panchayat} onChange={(e) => setPanchayat(e.target.value)} style={inputStyle} />
      <input placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <Button disabled={!username || !password} onClick={handleRegister}>Register & Continue</Button>
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const [screen, setScreen] = useState("login");
  const [language, setLanguage] = useState("English");
  const [userToken, setUserToken] = useState(null);
  const [farmerId, setFarmerId] = useState(null);
  const [farmerStageIndex, setFarmerStageIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cashConfirmed, setCashConfirmed] = useState(false);

  const handleLoginSuccess = () => {
    if (!userToken) { setUserToken(getNextToken()); setFarmerId(generateFarmerId()); }
    setScreen("farmerDashboard");
  };
  const handleRegisterSuccess = () => {
    setUserToken(getNextToken());
    setFarmerId(generateFarmerId());
    setScreen("farmerDashboard");
  };
  const handlePaymentComplete = (method) => { setPaymentMethod(method); setPaymentComplete(true); };
  const handleCheckIn = () => setFarmerStageIndex(1);
  const advanceStage = () => setFarmerStageIndex((i) => Math.min(i + 1, 4));
  const confirmCash = () => setCashConfirmed(true);

  useEffect(() => {
    if ((paymentComplete || cashConfirmed) && farmerStageIndex < 4) setFarmerStageIndex(4);
  }, [paymentComplete, cashConfirmed, farmerStageIndex]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", width: "100%" }}>
      {screen === "login" && (
        <div style={{ padding: 40 }}>
          <LoginScreen language={language} setLanguage={setLanguage} onNext={handleLoginSuccess} onRegister={() => setScreen("register")} />
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <span onClick={() => setScreen("headOfPanchayatLogin")} style={{ color: "#9ca3af", cursor: "pointer", fontSize: 13, marginRight: 16 }}>{t(language, "headOfPanchayat")} Login →</span>
            <span onClick={() => setScreen("secOfPanchayatLogin")} style={{ color: "#9ca3af", cursor: "pointer", fontSize: 13 }}>{t(language, "secOfPanchayat")} Login →</span>
          </p>
        </div>
      )}
      {screen === "register" && <div style={{ padding: 40 }}><RegisterScreen language={language} onNext={handleRegisterSuccess} /></div>}

      {screen === "farmerDashboard" && (
        <FarmerDashboard
          language={language} setLanguage={setLanguage}
          userToken={userToken} farmerId={farmerId} farmerStageIndex={farmerStageIndex}
          paymentMethod={paymentMethod} paymentComplete={paymentComplete}
          cashConfirmed={cashConfirmed}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {screen === "headOfPanchayatLogin" && <div style={{ padding: 40 }}><HeadOfPanchayatLoginScreen language={language} onNext={() => setScreen("headOfPanchayatDashboard")} onRegister={() => setScreen("headRegister")} /></div>}
      {screen === "headRegister" && <div style={{ padding: 40 }}><StaffRegisterScreen roleLabel={t(language, "headOfPanchayat")} roleKey="head" onNext={() => setScreen("headOfPanchayatDashboard")} /></div>}
      {screen === "headOfPanchayatDashboard" && (
        <div style={{ padding: 40 }}>
          <HeadOfPanchayatDashboardScreen language={language} farmerStageIndex={farmerStageIndex} paymentMethod={paymentMethod} paymentComplete={paymentComplete} cashConfirmed={cashConfirmed} />
        </div>
      )}

      {screen === "secOfPanchayatLogin" && <div style={{ padding: 40 }}><SecOfPanchayatLoginScreen language={language} onNext={() => setScreen("secOfPanchayatDashboard")} onRegister={() => setScreen("secRegister")} /></div>}
      {screen === "secRegister" && <div style={{ padding: 40 }}><StaffRegisterScreen roleLabel={t(language, "secOfPanchayat")} roleKey="sec" onNext={() => setScreen("secOfPanchayatDashboard")} /></div>}
      {screen === "secOfPanchayatDashboard" && (
        <div style={{ padding: 40 }}>
          <SecOfPanchayatDashboardScreen language={language} farmerStageIndex={farmerStageIndex} onCheckIn={handleCheckIn} onAdvanceStage={advanceStage} paymentMethod={paymentMethod} cashConfirmed={cashConfirmed} onConfirmCash={confirmCash} />
        </div>
      )}
    </div>
  );
}
export default App;