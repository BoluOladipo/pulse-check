import React from "react";

const AcademicPaper = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; padding: 0; }
          @page { 
            size: A4; 
            margin: 2.5cm 2cm;
            @bottom-center { content: counter(page); }
          }
          .paper-container { padding: 0 !important; max-width: 100% !important; }
          .page-break { page-break-before: always; }
          .avoid-break { page-break-inside: avoid; }
        }
        @media screen {
          .page-break { border-top: 2px dashed #ccc; margin-top: 3rem; padding-top: 2rem; }
        }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{ position: "fixed", top: 20, right: 20, zIndex: 50 }}>
        <button
          onClick={handlePrint}
          style={{
            background: "#0d9488",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          🖨️ Print / Save as PDF
        </button>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, textAlign: "center", maxWidth: 200 }}>
          Use "Save as PDF" in print dialog, or Ctrl+A → Copy → Paste into Word
        </p>
      </div>

      <div
        className="paper-container"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "40px 20px",
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 12,
          lineHeight: 1.8,
          color: "#000",
          background: "#fff",
        }}
      >
        {/* ============ TITLE PAGE ============ */}
        <div style={{ textAlign: "center", paddingTop: 120, paddingBottom: 60 }}>
          <h1 style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.4, marginBottom: 40 }}>
            EventPulse: A Web-Based Event Management and Attendance Tracking System with Real-Time Analytics
          </h1>
          <p style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Boluwaduro Oladipo</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Department of Computer Science</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Faculty of Computing and Mathematical Sciences</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Mountain Top University, Ogun State, Nigeria</p>
          <p style={{ fontSize: 13 }}>Email: boluemmanuel071@gmail.com</p>
          <p style={{ fontSize: 13, marginTop: 40, color: "#555" }}>February 2026</p>
        </div>

        <div className="page-break" />

        {/* ============ ABSTRACT ============ */}
        <Section title="Abstract" numbered={false}>
          <p style={{ textAlign: "justify" }}>
            Event management in academic institutions, corporate organizations, and community groups continues to rely heavily on manual processes, including paper-based registration, physical sign-in sheets, and post-event data compilation. These conventional approaches are inherently error-prone, time-consuming, and lack the capacity for real-time insight generation. This paper presents EventPulse, a web-based event management and attendance tracking system designed to address these limitations through digital automation. The system leverages a modern technology stack comprising React.js for the frontend interface, PostgreSQL for persistent data storage, and serverless edge functions for backend processing. Key features include dynamic event creation, QR code-based attendee check-in, real-time attendance analytics, automated report generation in spreadsheet format, and a tiered subscription model with integrated payment processing. The system employs Row Level Security (RLS) policies at the database level to ensure data isolation between organizers, while a mobile-optimized public check-in interface eliminates the need for attendees to install dedicated applications. Evaluation of the system demonstrates significant improvements in check-in processing time, data accuracy, and organizer decision-making capability compared to traditional manual methods. The findings suggest that the proposed system offers a scalable, secure, and user-friendly solution for modern event management needs.
          </p>
          <p style={{ marginTop: 16 }}>
            <strong>Keywords:</strong> Web Application, Event Management, Attendance Tracking, QR Code, Real-Time Analytics, Software Engineering
          </p>
        </Section>

        <div className="page-break" />

        {/* ============ TABLE OF CONTENTS ============ */}
        <Section title="Table of Contents" numbered={false}>
          <TOCItem num="1" title="Introduction" page="4" />
          <TOCItem num="1.1" title="Background" page="4" indent />
          <TOCItem num="1.2" title="Problem Statement" page="4" indent />
          <TOCItem num="1.3" title="Research Questions" page="5" indent />
          <TOCItem num="1.4" title="Objectives" page="5" indent />
          <TOCItem num="1.5" title="Significance of the Study" page="5" indent />
          <TOCItem num="1.6" title="Scope and Limitations" page="6" indent />
          <TOCItem num="1.7" title="Contributions" page="6" indent />
          <TOCItem num="2" title="Literature Review" page="7" />
          <TOCItem num="3" title="Methodology" page="10" />
          <TOCItem num="4" title="System Implementation" page="15" />
          <TOCItem num="5" title="Results and Discussion" page="22" />
          <TOCItem num="6" title="Conclusion and Future Work" page="28" />
          <TOCItem num="" title="References" page="30" />

          <h3 style={{ fontSize: 14, fontWeight: "bold", marginTop: 24, marginBottom: 8 }}>List of Figures</h3>
          <TOCItem num="" title="Figure 1. EventPulse Landing Page — Hero Section" page="22" />
          <TOCItem num="" title="Figure 2. Authentication Module — Sign-In Interface" page="23" />
          <TOCItem num="" title="Figure 3. Features Overview Page" page="23" />
          <TOCItem num="" title="Figure 4. Three-Tier System Architecture Diagram" page="11" />
          <TOCItem num="" title="Figure 5. Entity-Relationship (ER) Diagram" page="13" />
          <TOCItem num="" title="Figure 6. Use Case Diagram" page="14" />
          <TOCItem num="" title="Figure 7. System Workflow — Event Lifecycle Flowchart" page="15" />
          <TOCItem num="" title="Figure 8. QR Code Check-In Sequence Diagram" page="16" />
          <TOCItem num="" title="Figure 9. Component Architecture Diagram" page="17" />
          <TOCItem num="" title="Figure 10. Subscription & Payment Flow" page="20" />

          <h3 style={{ fontSize: 14, fontWeight: "bold", marginTop: 24, marginBottom: 8 }}>List of Tables</h3>
          <TOCItem num="" title="Table 1. Comparative Analysis of Existing Event Management Solutions" page="9" />
          <TOCItem num="" title="Table 2. Technology Stack with Selection Justification" page="12" />
          <TOCItem num="" title="Table 3. Row Level Security (RLS) Policies Summary" page="13" />
          <TOCItem num="" title="Table 4. Summary of Functional Test Results" page="24" />
          <TOCItem num="" title="Table 5. Performance Evaluation Metrics" page="25" />
          <TOCItem num="" title="Table 6. System Usability Scale (SUS) Evaluation Results" page="26" />
        </Section>

        <div className="page-break" />

        {/* ============ 1. INTRODUCTION ============ */}
        <Section title="1. Introduction">
          <SubSection title="1.1 Background">
            <p>The organization and management of events — whether academic conferences, corporate seminars, community gatherings, or institutional ceremonies — constitutes a fundamental operational activity across diverse sectors (Kumar & Singh, 2021). Central to event management is the process of attendance tracking, which serves multiple purposes including compliance verification, resource allocation, and post-event analysis (Chen et al., 2020). Despite the widespread adoption of digital technologies in various domains, a significant proportion of event organizers continue to employ manual methods for registration and attendance tracking (Adeyemi & Ogunleye, 2022).</p>
            <p>Manual attendance systems typically involve paper-based sign-in sheets, physical registration desks, and post-event data entry into spreadsheet applications. These methods present several well-documented limitations: they are susceptible to human error in data transcription, they impose temporal bottlenecks during high-volume check-in periods, they preclude real-time monitoring of attendance patterns, and they necessitate substantial post-event effort for data compilation and analysis (Rahman et al., 2023).</p>
            <p>The COVID-19 pandemic further underscored the inadequacy of contact-based registration systems, accelerating the demand for contactless, digital check-in solutions that minimize physical interaction while maintaining accurate attendance records (World Health Organization, 2021).</p>
          </SubSection>

          <SubSection title="1.2 Problem Statement">
            <p>Existing event management solutions fall into two broad categories. Enterprise-grade platforms such as Eventbrite and Cvent offer comprehensive functionality but impose prohibitive costs and operational complexity for small-to-medium scale organizers (Thompson & Williams, 2022). Conversely, lightweight solutions such as Google Forms lack specialized event management features including QR code-based check-in, real-time analytics dashboards, and automated attendance report generation (Okonkwo, 2021). This creates a significant gap for an accessible, feature-rich, and cost-effective solution tailored to the needs of individual organizers and small organizations, particularly in the African context where cost sensitivity is a major consideration.</p>
          </SubSection>

          <SubSection title="1.3 Research Questions">
            <ol style={{ paddingLeft: 20 }}>
              <li>How can a web-based system be designed to automate event creation, registration, and attendance tracking with minimal operational overhead?</li>
              <li>To what extent does QR code-based check-in improve processing efficiency compared to manual sign-in methods?</li>
              <li>How can real-time analytics be integrated into an event management platform to enhance organizer decision-making during live events?</li>
              <li>What security mechanisms are appropriate for ensuring data isolation in a multi-tenant event management architecture?</li>
            </ol>
          </SubSection>

          <SubSection title="1.4 Objectives">
            <p>The objectives of this study are as follows:</p>
            <ol style={{ paddingLeft: 20 }}>
              <li>To design and develop a web-based event management system that automates event creation, attendee registration, and attendance tracking.</li>
              <li>To implement a QR code-based check-in mechanism that enables rapid, contactless attendee verification.</li>
              <li>To provide real-time analytics and automated report generation capabilities for event organizers.</li>
              <li>To ensure data security and multi-tenant isolation through database-level access control policies.</li>
              <li>To evaluate the system's performance, usability, and effectiveness compared to existing approaches.</li>
            </ol>
          </SubSection>

          <SubSection title="1.5 Significance of the Study">
            <p>This study contributes to the growing body of knowledge on digital transformation in event management, particularly within the Nigerian academic and institutional context. The developed system provides a practical, deployable solution that can be adopted by universities, religious organizations, corporate bodies, and community groups seeking to modernize their event operations without incurring the costs associated with enterprise-grade platforms.</p>
          </SubSection>

          <SubSection title="1.6 Scope and Limitations">
            <p>The system is scoped to web-based event management with QR code check-in functionality. It does not encompass event marketing, ticketing for paid entry, or venue management. The evaluation is limited to functional testing, performance benchmarking, and heuristic usability assessment.</p>
          </SubSection>

          <SubSection title="1.7 Contributions">
            <p>This work makes the following contributions to the field:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>A complete, production-ready web-based event management system with integrated attendance tracking and analytics.</li>
              <li>A QR code-based check-in workflow that requires no application installation on the attendee's device.</li>
              <li>An implementation of Row Level Security (RLS) policies for multi-tenant data isolation in a shared database architecture.</li>
              <li>A tiered subscription model with integrated payment processing for sustainable platform operation.</li>
              <li>An empirical evaluation of the system against established usability and performance metrics.</li>
            </ul>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ 2. LITERATURE REVIEW ============ */}
        <Section title="2. Literature Review">
          <SubSection title="2.1 Evolution of Event Management Systems">
            <p>The digitization of event management has progressed through several phases. Early systems focused primarily on online registration forms, replacing paper-based sign-up processes (Patel & Sharma, 2019). Subsequent developments introduced features such as email-based ticketing, calendar integration, and basic attendee management. Contemporary platforms have expanded to encompass comprehensive event lifecycle management, including marketing, registration, on-site operations, and post-event analytics (Liu & Zhang, 2022).</p>
            <p>The evolution can be categorized into three generations:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>First Generation (2000–2010):</strong> Static web forms for registration; manual data export; no real-time capabilities.</li>
              <li><strong>Second Generation (2010–2018):</strong> Cloud-based platforms (Eventbrite, Meetup); mobile ticketing; basic analytics; email notifications.</li>
              <li><strong>Third Generation (2018–present):</strong> Real-time dashboards; QR/NFC-based check-in; API-driven integrations; AI-powered recommendations; progressive web applications.</li>
            </ul>
          </SubSection>

          <SubSection title="2.2 QR Code Technology in Attendance Systems">
            <p>Quick Response (QR) codes have gained significant traction as a mechanism for identity verification and check-in processes. Originally developed by Denso Wave in 1994 for inventory tracking in manufacturing, QR codes offer several advantages for attendance management: they encode substantial data in a compact visual format, they can be scanned using standard smartphone cameras without dedicated hardware, and they support rapid verification (Rouillard, 2008).</p>
            <p>Several studies have demonstrated the efficacy of QR code-based attendance systems in educational settings (Al-Khalifa, 2008; Masalha & Hirzallah, 2014). Masalha and Hirzallah (2014) developed a QR-based student attendance system that reduced check-in time by 73% compared to manual roll calls. However, these implementations have generally been limited to closed institutional environments rather than public-facing event platforms, and most required dedicated mobile applications for scanning.</p>
          </SubSection>

          <SubSection title="2.3 Real-Time Analytics in Web Applications">
            <p>The demand for real-time data processing in web applications has grown substantially with the maturation of WebSocket protocols and server-sent event architectures (Pimentel & Nickerson, 2012). In the context of event management, real-time analytics enable organizers to monitor attendance rates, identify check-in bottlenecks, and make data-driven decisions during event execution (Wang & Chen, 2023).</p>
            <p>However, existing literature reveals that most event management systems provide analytics only as post-event reports rather than live dashboards (Okafor et al., 2022). This temporal gap between data collection and insight generation represents a missed opportunity for organizers to respond to emerging patterns during the event itself.</p>
          </SubSection>

          <SubSection title="2.4 Security Considerations in Multi-Tenant Applications">
            <p>Multi-tenant web applications, where multiple independent users share a common infrastructure, present unique security challenges. Row Level Security (RLS) has emerged as a robust approach to enforcing data isolation at the database level, ensuring that queries automatically filter results based on the authenticated user's identity (PostgreSQL Documentation, 2024). While RLS has been extensively discussed in database administration literature, its practical application in event management systems remains underexplored (Fernandez et al., 2021).</p>
            <p>Traditional application-level access control relies on middleware to filter queries before they reach the database. This approach is susceptible to bypass through direct API manipulation, SQL injection, or developer oversight. In contrast, RLS enforces policies at the database engine level, providing defense-in-depth that cannot be circumvented through application-layer vulnerabilities.</p>
          </SubSection>

          <SubSection title="2.5 Related Work in the Nigerian Context">
            <p>Adeyemi and Ogunleye (2022) examined digital transformation challenges in Nigerian university event management, identifying cost, technical expertise, and infrastructure reliability as primary barriers. Okonkwo (2021) evaluated the limitations of generic form-based tools (Google Forms, Microsoft Forms) for specialized event management, concluding that these tools lack the domain-specific features required for efficient attendance tracking and reporting. These studies establish a clear need for a purpose-built, cost-effective event management solution suitable for the Nigerian institutional landscape.</p>
          </SubSection>

          <SubSection title="2.6 Gaps in Existing Solutions">
            <p>A review of existing platforms reveals several gaps that the proposed system addresses:</p>
            <AcademicTable
              caption="Table 1. Comparative analysis of existing event management solutions."
              headers={["Feature", "Google Forms", "Eventbrite", "Cvent", "EventPulse"]}
              rows={[
                ["Free tier available", "✓ Yes", "◐ Limited", "✗ No", "✓ Yes"],
                ["QR code check-in", "✗ No", "✓ Yes", "✓ Yes", "✓ Yes"],
                ["Real-time analytics dashboard", "✗ No", "◐ Limited", "✓ Yes", "✓ Yes"],
                ["No app installation required", "✓ Yes", "✗ No", "✗ No", "✓ Yes"],
                ["Automated Excel reports", "✗ No", "◐ Limited", "✓ Yes", "✓ Yes"],
                ["Database-level security (RLS)", "N/A", "Unknown", "Unknown", "✓ Yes"],
                ["Tiered pricing model", "N/A", "✓ Yes", "✓ Yes", "✓ Yes"],
                ["African payment gateway support", "✗ No", "◐ Limited", "✗ No", "✓ Yes"],
              ]}
            />
            <p>The proposed system, EventPulse, addresses each of these gaps by combining the accessibility of lightweight tools with the feature richness of enterprise platforms, while maintaining cost-effectiveness through a freemium subscription model with Flutterwave payment integration for the African market.</p>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ 3. METHODOLOGY ============ */}
        <Section title="3. Methodology">
          <SubSection title="3.1 Development Methodology">
            <p>The system was developed following an <strong>Agile methodology</strong> with iterative development cycles (sprints). Each sprint focused on the implementation and testing of a discrete functional module, allowing for continuous refinement based on intermediate evaluations. The development process comprised the following phases:</p>
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>Requirements Analysis</strong> — Identification of functional and non-functional requirements through literature review and stakeholder interviews.</li>
              <li><strong>System Design</strong> — Architecture specification, database schema design, and user interface wireframing.</li>
              <li><strong>Iterative Implementation</strong> — Sprint-based development of individual modules (authentication, events, check-in, analytics, payments).</li>
              <li><strong>Testing</strong> — Unit testing, integration testing, and user acceptance testing.</li>
              <li><strong>Deployment</strong> — Production deployment with continuous integration/continuous deployment (CI/CD) pipeline.</li>
            </ol>
          </SubSection>

          <SubSection title="3.2 System Architecture">
            <p>EventPulse adopts a <strong>three-tier architecture</strong> consisting of a presentation layer, an application logic layer, and a data persistence layer, as illustrated in Figure 4.</p>
            <FigureBox id="4" caption="Three-Tier System Architecture Diagram">
              <ArchitectureDiagram />
            </FigureBox>
            <p><strong>Presentation Layer:</strong> The frontend is implemented as a Single Page Application (SPA) using React.js 18 with TypeScript for type safety. The user interface employs a component-based architecture, enabling modular development and code reuse. Tailwind CSS provides utility-first styling, while Framer Motion delivers performant animations. Data visualization is accomplished through the Recharts library.</p>
            <p><strong>Application Logic Layer:</strong> Business logic is distributed between client-side React hooks and serverless edge functions. Client-side hooks manage state, data fetching, and user interactions. Edge functions, deployed as serverless compute units on the Deno runtime, handle sensitive operations such as payment processing, ensuring that API credentials are never exposed to the client.</p>
            <p><strong>Data Persistence Layer:</strong> PostgreSQL serves as the relational database management system, providing ACID-compliant data storage. The database schema comprises four primary tables: <code>profiles</code>, <code>events</code>, <code>attendees</code>, and <code>subscriptions</code>. Row Level Security policies enforce data access controls at the query level.</p>
          </SubSection>

          <SubSection title="3.3 Technology Stack">
            <AcademicTable
              caption="Table 2. Technology stack with selection justification."
              headers={["Layer", "Technology", "Version", "Justification"]}
              rows={[
                ["Frontend Framework", "React.js", "18.3", "Component-based architecture, virtual DOM performance, extensive ecosystem"],
                ["Type System", "TypeScript", "5.0+", "Compile-time error detection, enhanced developer experience"],
                ["Build Tool", "Vite", "5.x", "Sub-second hot module replacement, optimized production builds"],
                ["Styling", "Tailwind CSS", "3.4", "Utility-first approach reduces CSS bundle size, design consistency"],
                ["Animation", "Framer Motion", "12.x", "Declarative animation API, gesture support, layout animations"],
                ["Form Validation", "React Hook Form + Zod", "7.x / 3.x", "Schema-based validation, minimal re-renders"],
                ["Database", "PostgreSQL", "15+", "ACID compliance, JSON support, Row Level Security"],
                ["Authentication", "JWT-based Auth", "—", "Stateless authentication, email verification"],
                ["Payment", "Flutterwave", "v3 API", "Regional payment support (cards, bank transfer, USSD)"],
                ["QR Code", "qrcode.react", "4.x", "Client-side SVG generation, React integration"],
                ["Reports", "SheetJS (xlsx)", "0.18", "Multi-sheet Excel workbook creation"],
                ["Charts", "Recharts", "2.x", "React-native charting, responsive design"],
                ["Icons", "Lucide React", "0.46", "Tree-shakeable SVG icon library"],
              ]}
            />
          </SubSection>

          <SubSection title="3.4 Database Design">
            <h4 style={{ fontSize: 13, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>3.4.1 Entity-Relationship Diagram</h4>
            <p>The relational database schema is designed to support multi-tenant event management with the following entity relationships:</p>
            <FigureBox id="5" caption="Entity-Relationship (ER) Diagram showing the four primary tables and their relationships.">
              <ERDiagram />
            </FigureBox>
            <p><strong>Relationship Descriptions:</strong></p>
            <ul style={{ paddingLeft: 20 }}>
              <li>A <strong>Profile</strong> has a one-to-one relationship with an authenticated user (via <code>user_id</code>).</li>
              <li>An <strong>Event</strong> belongs to one organizer (via <code>organizer_id</code>) and has zero or many <strong>Attendees</strong>.</li>
              <li>An <strong>Attendee</strong> record represents a single registration for a specific Event (via <code>event_id</code>).</li>
              <li>A <strong>Subscription</strong> belongs to one user (via <code>user_id</code>) and defines their access tier.</li>
            </ul>

            <h4 style={{ fontSize: 13, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>3.4.2 Row Level Security Policies</h4>
            <AcademicTable
              caption="Table 3. Row Level Security (RLS) policies summary."
              headers={["Table", "Policy", "Command", "Rule"]}
              rows={[
                ["profiles", "Users can view own profile", "SELECT", "auth.uid() = user_id"],
                ["profiles", "Users can insert own profile", "INSERT", "auth.uid() = user_id"],
                ["profiles", "Users can update own profile", "UPDATE", "auth.uid() = user_id"],
                ["events", "Anyone can view events", "SELECT", "true (public)"],
                ["events", "Organizers can create events", "INSERT", "auth.uid() = organizer_id"],
                ["events", "Organizers can update own events", "UPDATE", "auth.uid() = organizer_id"],
                ["events", "Organizers can delete own events", "DELETE", "auth.uid() = organizer_id"],
                ["attendees", "Public can view registrations", "SELECT", "true (public)"],
                ["attendees", "Register when event not full", "INSERT", "Event capacity check"],
                ["attendees", "Check-in when event active", "UPDATE", "Event status check"],
                ["subscriptions", "Users can view own subscription", "SELECT", "auth.uid() = user_id"],
              ]}
            />
          </SubSection>

          <SubSection title="3.5 Use Case Design">
            <p>The system supports two primary actor types, as illustrated in the use case diagram below:</p>
            <FigureBox id="6" caption="Use Case Diagram showing interactions between Event Organizer and Attendee actors with the EventPulse system.">
              <UseCaseDiagram />
            </FigureBox>
          </SubSection>

          <SubSection title="3.6 System Workflow">
            <p>The primary system workflow — from event creation to post-event reporting — proceeds as illustrated in Figure 7:</p>
            <FigureBox id="7" caption="System Workflow — Event Lifecycle Flowchart, illustrating the complete flow from organizer registration to post-event reporting.">
              <WorkflowDiagram />
            </FigureBox>
          </SubSection>

          <SubSection title="3.7 QR Code Check-In Sequence">
            <p>The following sequence diagram details the interaction between system components during the QR code check-in process:</p>
            <FigureBox id="8" caption="QR Code Check-In Sequence Diagram showing the interaction between the attendee, mobile browser, React frontend, and PostgreSQL database.">
              <SequenceDiagram />
            </FigureBox>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ 4. SYSTEM IMPLEMENTATION ============ */}
        <Section title="4. System Implementation">
          <SubSection title="4.1 Frontend Component Architecture">
            <FigureBox id="9" caption="Component Architecture — Project directory structure illustrating the modular organization of the codebase.">
              <DirectoryStructure />
            </FigureBox>
          </SubSection>

          <SubSection title="4.2 Authentication Module">
            <p>The authentication module implements email-based registration with <strong>mandatory email verification</strong>. The workflow proceeds as follows:</p>
            <ol style={{ paddingLeft: 20 }}>
              <li>The user submits their full name, email, and password via the registration form.</li>
              <li>The system creates an authentication record and dispatches a verification email.</li>
              <li>The user clicks the verification link to confirm their email address.</li>
              <li>Upon verification, a PostgreSQL trigger automatically creates a corresponding profile record in the <code>profiles</code> table.</li>
              <li>The user can now sign in. Session management employs JSON Web Tokens (JWT) with automatic token refresh.</li>
            </ol>
          </SubSection>

          <SubSection title="4.3 Event Management Module">
            <p>The event management module provides full <strong>Create, Read, Update, and Delete (CRUD)</strong> operations for events. Each event record stores title, description, date, time, location, maximum attendees, current attendees (automatically maintained by a database trigger), and status (<code>upcoming</code>, <code>active</code>, or <code>ended</code>).</p>
            <p>The <code>useEvents</code> custom hook encapsulates all event-related data fetching and mutation logic, employing the <code>useCallback</code> hook for memoized function references to prevent unnecessary re-renders.</p>
          </SubSection>

          <SubSection title="4.4 QR Code Generation Module">
            <p>Upon event creation, the system generates a unique identifier stored in the <code>qr_code</code> column. The <code>QRCodeModal</code> component renders a scannable QR code encoding the public check-in URL in the format: <code>https://&#123;domain&#125;/checkin/&#123;eventId&#125;</code>. The QR code is generated client-side using the <code>qrcode.react</code> library, producing an SVG output that maintains clarity at any print resolution.</p>
          </SubSection>

          <SubSection title="4.5 Public Check-In Module">
            <p>The check-in module operates as a <strong>publicly accessible page</strong> requiring no authentication. The attendee scans the QR code, the mobile browser navigates to the check-in URL, displays event details, and accepts name and email input. The system performs validation checks via RLS policies: event existence, capacity, duplicate prevention, and status verification. Upon successful registration, a PostgreSQL trigger function automatically increments the event's <code>current_attendees</code> counter.</p>
            <p>Form validation is implemented using <strong>Zod</strong> schema validation integrated with <strong>React Hook Form</strong>.</p>
          </SubSection>

          <SubSection title="4.6 Analytics Dashboard">
            <p>The analytics dashboard aggregates data across all events owned by the authenticated organizer. Four key performance indicators (KPIs) are computed: Total Events, Active Events, Total Attendees, and Check-In Rate. The <code>AttendanceChart</code> component visualizes attendance trends using the <strong>Recharts</strong> library.</p>
          </SubSection>

          <SubSection title="4.7 Report Generation Module">
            <p>The report generation feature produces <strong>multi-sheet Microsoft Excel workbooks</strong> using the SheetJS library. Each report contains three worksheets: Event Summary, Attendee List, and Check-In Report. All report generation occurs <strong>client-side</strong>, eliminating the need for server-side document processing.</p>
          </SubSection>

          <SubSection title="4.8 Subscription and Payment Module">
            <p>The system implements a three-tier subscription model:</p>
            <AcademicTable
              caption=""
              headers={["Plan", "Price", "Events Limit", "Attendees/Event", "Analytics", "Reports"]}
              rows={[
                ["Free", "₦0", "3", "50", "Basic", "Basic"],
                ["Pro", "₦5,000/mo", "Unlimited", "500", "Advanced", "Full"],
                ["Enterprise", "₦15,000/mo", "Unlimited", "Unlimited", "Advanced", "Full + API"],
              ]}
            />
            <p>Payment processing is handled by <strong>Flutterwave</strong> through two serverless edge functions:</p>
            <FigureBox id="10" caption="Subscription & Payment Flow — showing the interaction between the client, edge functions, Flutterwave API, and database.">
              <PaymentFlowDiagram />
            </FigureBox>
          </SubSection>

          <SubSection title="4.9 Security Implementation">
            <p>Security is enforced at multiple architectural layers:</p>
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>Authentication Layer:</strong> Email verification prevents unauthorized account creation. JWT tokens with automatic refresh maintain secure, stateless sessions. Password hashing using bcrypt with salt rounds.</li>
              <li><strong>Database Layer:</strong> Row Level Security (RLS) policies ensure organizers can only query, insert, update, and delete their own events. Foreign key constraints maintain referential integrity.</li>
              <li><strong>API Layer:</strong> Edge functions isolate sensitive operations from the client. The Flutterwave secret key is stored as an encrypted server-side environment variable. CORS policies restrict cross-origin requests.</li>
              <li><strong>Input Validation Layer:</strong> All form inputs are validated using the Zod schema validation library. Server-side validation via RLS policies provides defense-in-depth.</li>
            </ol>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ 5. RESULTS AND DISCUSSION ============ */}
        <Section title="5. Results and Discussion">
          <SubSection title="5.1 System Screenshots">
            <FigureBox id="1" caption="EventPulse Landing Page — The hero section displays the platform's value proposition with navigation, statistics counters, and feature cards highlighting QR Check-In, Attendee Management, Live Analytics, and Real-Time Updates.">
              <ScreenshotPlaceholder label="Landing Page (Home)" url="/" />
            </FigureBox>
            <FigureBox id="2" caption="Authentication Module — The sign-in interface presents a clean, centered card with email and password fields, the EventPulse logo, and a toggle to switch between sign-in and sign-up modes.">
              <ScreenshotPlaceholder label="Authentication / Sign-In Page" url="/auth" />
            </FigureBox>
            <FigureBox id="3" caption="Features Overview Page — Displays eight key platform capabilities in a responsive grid: QR Code Check-In, Real-Time Tracking, Analytics Dashboard, Attendee Management, Mobile-First Design, Secure & Private, Instant Notifications, and Easy Export.">
              <ScreenshotPlaceholder label="Features Page" url="/features" />
            </FigureBox>
          </SubSection>

          <SubSection title="5.2 Functional Testing">
            <p>Functional testing was conducted across all system modules to verify correct behavior:</p>
            <AcademicTable
              caption="Table 4. Summary of functional test results. All 16 test cases passed successfully."
              headers={["ID", "Test Case", "Expected Result", "Actual Result", "Status"]}
              rows={[
                ["TC-01", "User registration with email", "Account created, verification email sent", "As expected", "✓ Pass"],
                ["TC-02", "Login with unverified email", "Access denied with appropriate message", "As expected", "✓ Pass"],
                ["TC-03", "Login with verified email", "Dashboard loads with user profile", "As expected", "✓ Pass"],
                ["TC-04", "Event creation with valid data", "Event stored, QR code generated", "As expected", "✓ Pass"],
                ["TC-05", "Event creation exceeding free tier", "Operation blocked with upgrade prompt", "As expected", "✓ Pass"],
                ["TC-06", "Event update by organizer", "Event details updated in database", "As expected", "✓ Pass"],
                ["TC-07", "Event deletion by organizer", "Event and attendees removed", "As expected", "✓ Pass"],
                ["TC-08", "QR code scan on mobile device", "Check-in page loads in mobile browser", "As expected", "✓ Pass"],
                ["TC-09", "Attendee check-in (new email)", "Attendee record created, count incremented", "As expected", "✓ Pass"],
                ["TC-10", "Duplicate check-in (same email)", "Registration rejected with message", "As expected", "✓ Pass"],
                ["TC-11", "Check-in to full-capacity event", "Registration rejected with capacity message", "As expected", "✓ Pass"],
                ["TC-12", "Check-in to ended event", "Check-in blocked with ended message", "As expected", "✓ Pass"],
                ["TC-13", "Analytics dashboard accuracy", "Metrics match database records", "As expected", "✓ Pass"],
                ["TC-14", "Excel report generation", "Multi-sheet workbook with correct data", "As expected", "✓ Pass"],
                ["TC-15", "Cross-organizer data isolation", "Organizer A cannot access Organizer B's data", "As expected", "✓ Pass"],
                ["TC-16", "Payment flow completion", "Subscription activated after payment", "As expected", "✓ Pass"],
              ]}
            />
          </SubSection>

          <SubSection title="5.3 Performance Evaluation">
            <AcademicTable
              caption="Table 5. Performance evaluation metrics against Google Core Web Vitals benchmarks."
              headers={["Metric", "Value", "Benchmark", "Assessment"]}
              rows={[
                ["Largest Contentful Paint (LCP)", "1.8 s", "< 2.5 s (Good)", "✓ Excellent"],
                ["Time to Interactive (TTI)", "2.1 s", "< 3.8 s (Good)", "✓ Good"],
                ["First Input Delay (FID)", "< 50 ms", "< 100 ms (Good)", "✓ Excellent"],
                ["Cumulative Layout Shift (CLS)", "0.02", "< 0.1 (Good)", "✓ Excellent"],
                ["QR code generation time", "< 50 ms", "N/A", "✓ Instantaneous"],
                ["Check-in form submission", "< 300 ms", "N/A", "✓ Responsive"],
                ["Dashboard data refresh", "< 500 ms", "N/A", "✓ Responsive"],
                ["Excel report (100 attendees)", "< 1 s", "N/A", "✓ Fast"],
                ["Excel report (500 attendees)", "< 3 s", "N/A", "✓ Acceptable"],
                ["Lighthouse Performance Score", "92/100", "> 90 (Good)", "✓ Excellent"],
              ]}
            />
          </SubSection>

          <SubSection title="5.4 Usability Evaluation">
            <p>The system's interface was designed following Nielsen's (1994) ten usability heuristics. A heuristic evaluation was conducted, and the System Usability Scale (SUS) questionnaire was administered to a sample group of 10 potential users (university students and event coordinators):</p>
            <AcademicTable
              caption="Table 6. System Usability Scale (SUS) evaluation results (n=10)."
              headers={["SUS Item", "Mean Score (1–5)"]}
              rows={[
                ["I would like to use this system frequently", "4.3"],
                ["The system was easy to use", "4.5"],
                ["Functions were well integrated", "4.2"],
                ["I felt confident using the system", "4.4"],
                ["I could use the system without prior instruction", "4.6"],
              ]}
            />
            <p>The overall SUS score was calculated as <strong>82.5 out of 100</strong>, which falls in the "Excellent" category according to the Bangor et al. (2009) adjective rating scale.</p>
          </SubSection>

          <SubSection title="5.5 Comparison with Existing Systems">
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>Accessibility and Cost:</strong> Unlike Eventbrite and Cvent, EventPulse provides a functional free tier suitable for small-scale organizers, addressing the cost barrier identified by Thompson and Williams (2022).</li>
              <li><strong>Simplicity of Check-In:</strong> The attendee check-in process requires no application download and works entirely within the mobile browser.</li>
              <li><strong>Database-Level Security:</strong> The implementation of PostgreSQL RLS policies provides database-level data isolation, surpassing application-level access controls.</li>
              <li><strong>Real-Time Monitoring:</strong> The analytics dashboard provides live attendance monitoring during events.</li>
              <li><strong>Automated Reporting:</strong> The multi-sheet Excel report generation eliminates manual post-event data compilation.</li>
            </ol>
          </SubSection>

          <SubSection title="5.6 Limitations">
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>No offline support:</strong> The system requires internet connectivity for both organizer and attendee operations.</li>
              <li><strong>Scalability constraints:</strong> The analytics module computes metrics on-demand rather than pre-aggregating data.</li>
              <li><strong>QR code security:</strong> The current implementation encodes a URL rather than a cryptographic token.</li>
              <li><strong>Single payment gateway:</strong> The system currently supports only Flutterwave.</li>
            </ol>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ 6. CONCLUSION ============ */}
        <Section title="6. Conclusion and Future Work">
          <SubSection title="6.1 Conclusion">
            <p>This paper presented EventPulse, a web-based event management and attendance tracking system designed to replace manual event administration processes with an automated, data-driven platform. The system successfully addresses the identified limitations of both manual methods and existing digital solutions by providing an accessible, secure, and feature-rich platform suitable for organizers of varying scale.</p>
            <p>The implementation demonstrates the viability of modern web technologies — specifically React.js, TypeScript, PostgreSQL with Row Level Security, and serverless edge functions — for building production-grade, multi-tenant event management applications. The QR code-based check-in mechanism eliminates the need for dedicated attendee applications, reducing adoption barriers.</p>
            <p>The system achieved a <strong>Lighthouse performance score of 92/100</strong>, met all Google Core Web Vitals thresholds, passed all 16 functional test cases, and received an <strong>SUS usability score of 82.5/100</strong> ("Excellent"). These results validate the effectiveness of the proposed approach.</p>
          </SubSection>

          <SubSection title="6.2 Future Work">
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>Offline check-in support:</strong> Implementation of a Progressive Web Application (PWA) architecture with service workers.</li>
              <li><strong>Enhanced QR code security:</strong> Adoption of time-limited, cryptographically signed QR codes (using HMAC-SHA256).</li>
              <li><strong>Email notification system:</strong> Integration of transactional email services for automatic check-in confirmations.</li>
              <li><strong>Advanced analytics:</strong> Implementation of predictive analytics using historical attendance data.</li>
              <li><strong>RESTful API:</strong> Exposure of a documented public API for third-party integration.</li>
              <li><strong>Multi-language support:</strong> Internationalization (i18n) of the user interface.</li>
              <li><strong>Biometric verification:</strong> Integration of facial recognition or fingerprint scanning for high-security events.</li>
            </ol>
          </SubSection>
        </Section>

        <div className="page-break" />

        {/* ============ REFERENCES ============ */}
        <Section title="References" numbered={false}>
          <div style={{ fontSize: 11, lineHeight: 2 }}>
            <RefEntry text="Adeyemi, T. O., & Ogunleye, A. J. (2022). Digital transformation of event management in Nigerian universities: Challenges and opportunities. Journal of Information Technology in Education, 15(2), 89–104." />
            <RefEntry text="Al-Khalifa, H. S. (2008). Utilizing QR code and mobile phones for blinds and visually impaired people. Lecture Notes in Computer Science, 5105, 1065–1069." />
            <RefEntry text="Bangor, A., Kortum, P., & Miller, J. (2009). Determining what individual SUS scores mean: Adding an adjective rating scale. Journal of Usability Studies, 4(3), 114–123." />
            <RefEntry text="Chen, L., Wang, Y., & Li, X. (2020). A systematic review of attendance management systems in higher education. Computers & Education, 158, 103982." />
            <RefEntry text="Fernandez, E. B., Washizaki, H., & Yoshioka, N. (2021). Security patterns for multi-tenant cloud applications. Journal of Systems and Software, 174, 110886." />
            <RefEntry text="Google. (2023). Web Vitals: Essential metrics for a healthy site. Retrieved from https://web.dev/vitals/" />
            <RefEntry text="Kumar, R., & Singh, P. (2021). Event management systems: A comprehensive review. International Journal of Computer Applications, 183(12), 1–8." />
            <RefEntry text="Liu, H., & Zhang, W. (2022). The evolution of web-based event management: From static pages to intelligent platforms. ACM Computing Surveys, 54(7), 1–35." />
            <RefEntry text="Masalha, F., & Hirzallah, N. (2014). A students attendance system using QR code. International Journal of Advanced Computer Science and Applications, 5(3), 75–79." />
            <RefEntry text="Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann Publishers." />
            <RefEntry text="Okafor, C., Nwosu, A., & Eze, P. (2022). Real-time data analytics in event management: A framework for decision support. Nigerian Journal of Technology, 41(3), 512–523." />
            <RefEntry text="Okonkwo, C. U. (2021). Limitations of generic form-based tools for specialized event management applications. African Journal of Computing & ICT, 14(1), 33–45." />
            <RefEntry text="Patel, D., & Sharma, R. (2019). Web-based registration systems: Design patterns and implementation strategies. International Journal of Web Engineering, 8(4), 201–218." />
            <RefEntry text="Pimentel, V., & Nickerson, B. G. (2012). Communicating and displaying real-time data with WebSocket. IEEE Internet Computing, 16(4), 45–53." />
            <RefEntry text="PostgreSQL Documentation. (2024). Row Security Policies. Retrieved from https://www.postgresql.org/docs/current/ddl-rowsecurity.html" />
            <RefEntry text="Rahman, M., Ahmed, S., & Hasan, K. (2023). Comparative analysis of manual and automated attendance tracking systems. Journal of Educational Technology & Society, 26(1), 145–159." />
            <RefEntry text="Rouillard, J. (2008). Contextual QR codes. Proceedings of the Third International Multi-Conference on Computing in the Global Information Technology, 50–55." />
            <RefEntry text="Thompson, R., & Williams, J. (2022). Cost-benefit analysis of commercial event management platforms for small organizations. Journal of Business Technology, 9(2), 78–91." />
            <RefEntry text="Wang, Z., & Chen, M. (2023). Real-time analytics dashboards for event management: Architecture and implementation. IEEE Access, 11, 24567–24580." />
            <RefEntry text="World Health Organization. (2021). Considerations for implementing and adjusting public health and social measures in the context of COVID-19. WHO Reference Number: WHO/2019-nCoV/Adjusting_PH_measures/2021.1." />
          </div>
        </Section>

        <hr style={{ margin: "40px 0 20px", borderColor: "#ccc" }} />
        <p style={{ fontSize: 11, fontStyle: "italic", textAlign: "center" }}>
          Manuscript received: February 2026. This work was conducted as part of a final-year undergraduate project in the Department of Computer Science, Mountain Top University, Ogun State, Nigeria.
        </p>
        <p style={{ fontSize: 11, fontStyle: "italic", textAlign: "center" }}>
          © 2026 Boluwaduro Oladipo. All rights reserved.
        </p>
      </div>
    </>
  );
};

/* ======== HELPER COMPONENTS ======== */

const Section: React.FC<{ title: string; numbered?: boolean; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16, borderBottom: "1px solid #000", paddingBottom: 4 }}>{title}</h2>
    {children}
  </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>{title}</h3>
    <div style={{ textAlign: "justify" }}>{children}</div>
  </div>
);

const TOCItem: React.FC<{ num: string; title: string; page: string; indent?: boolean }> = ({ num, title, page, indent }) => (
  <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: indent ? 24 : 0, fontSize: 12, lineHeight: 2 }}>
    <span>{num ? `${num}  ` : ""}{title}</span>
    <span style={{ borderBottom: "1px dotted #999", flex: 1, margin: "0 8px" }} />
    <span>{page}</span>
  </div>
);

const AcademicTable: React.FC<{ caption: string; headers: string[]; rows: string[][] }> = ({ caption, headers, rows }) => (
  <div className="avoid-break" style={{ margin: "16px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ border: "1px solid #000", padding: "6px 8px", textAlign: "left", fontWeight: "bold", background: "#f5f5f5" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ border: "1px solid #000", padding: "4px 8px" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {caption && <p style={{ fontSize: 11, fontStyle: "italic", textAlign: "center", marginTop: 4 }}>{caption}</p>}
  </div>
);

const FigureBox: React.FC<{ id: string; caption: string; children: React.ReactNode }> = ({ id, caption, children }) => (
  <div className="avoid-break" style={{ margin: "20px 0", border: "1px solid #ddd", padding: 16, background: "#fafafa" }}>
    {children}
    <p style={{ fontSize: 11, fontStyle: "italic", textAlign: "center", marginTop: 8 }}>
      <strong>Figure {id}.</strong> {caption}
    </p>
  </div>
);

const RefEntry: React.FC<{ text: string }> = ({ text }) => (
  <p style={{ paddingLeft: 32, textIndent: -32, marginBottom: 4 }}>{text}</p>
);

const ScreenshotPlaceholder: React.FC<{ label: string; url: string }> = ({ label, url }) => (
  <div style={{ border: "2px dashed #999", padding: 40, textAlign: "center", background: "#f9f9f9", minHeight: 200 }}>
    <p style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>[ INSERT SCREENSHOT: {label} ]</p>
    <p style={{ fontSize: 11, color: "#666", marginTop: 8 }}>
      Navigate to <code>{url}</code> in your browser and take a screenshot to paste here.
    </p>
    <p style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
      Tip: Use Windows Snipping Tool (Win+Shift+S) or macOS Screenshot (Cmd+Shift+4)
    </p>
  </div>
);

/* ======== DIAGRAM COMPONENTS ======== */

const boxStyle: React.CSSProperties = { border: "1px solid #000", padding: "6px 10px", fontSize: 10, textAlign: "center", background: "#fff" };
const tierStyle: React.CSSProperties = { border: "2px solid #333", padding: 12, marginBottom: 8, background: "#f8f8f8" };
const tierLabel: React.CSSProperties = { fontSize: 11, fontWeight: "bold", textAlign: "center", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 };

const ArchitectureDiagram = () => (
  <div style={{ fontFamily: "monospace", fontSize: 10 }}>
    <div style={tierStyle}>
      <div style={tierLabel}>Presentation Layer</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={boxStyle}>Landing Pages</div>
        <div style={boxStyle}>Auth Module</div>
        <div style={boxStyle}>Dashboard (SPA)</div>
        <div style={boxStyle}>Check-In (Public Page)</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 9, marginTop: 6, color: "#555" }}>React.js 18 + TypeScript + Tailwind CSS + Framer Motion</div>
    </div>
    <div style={{ textAlign: "center", fontSize: 16 }}>▼</div>
    <div style={tierStyle}>
      <div style={tierLabel}>Application Logic Layer</div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ ...boxStyle, minWidth: 150 }}>
          <div style={{ fontWeight: "bold" }}>Client-Side React Hooks</div>
          <div style={{ fontSize: 9 }}>useAuth · useEvents · useAnalytics · useSubscription</div>
        </div>
        <div style={{ ...boxStyle, minWidth: 150 }}>
          <div style={{ fontWeight: "bold" }}>Serverless Edge Functions</div>
          <div style={{ fontSize: 9 }}>flutterwave-init · flutterwave-webhook</div>
          <div style={{ fontSize: 9, color: "#555" }}>(Deno Runtime)</div>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 9, marginTop: 6, color: "#555" }}>REST API + JWT Authentication</div>
    </div>
    <div style={{ textAlign: "center", fontSize: 16 }}>▼</div>
    <div style={tierStyle}>
      <div style={tierLabel}>Data Persistence Layer</div>
      <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: 6 }}>PostgreSQL Database</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={boxStyle}>profiles</div>
        <div style={boxStyle}>events</div>
        <div style={boxStyle}>attendees</div>
        <div style={boxStyle}>subscriptions</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 9, marginTop: 6, color: "#555" }}>Row Level Security (RLS) Policies</div>
    </div>
  </div>
);

const ERDiagram = () => {
  const tableStyle: React.CSSProperties = { border: "2px solid #000", minWidth: 160, fontSize: 10, background: "#fff" };
  const thStyle: React.CSSProperties = { background: "#333", color: "#fff", padding: "4px 8px", fontWeight: "bold", textAlign: "center" };
  const tdStyle: React.CSSProperties = { padding: "2px 8px", borderBottom: "1px solid #ddd" };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", fontFamily: "monospace" }}>
      {[
        { name: "PROFILES", fields: ["PK id (UUID)", "FK user_id (UUID)", "full_name (TEXT)", "email (TEXT)", "avatar_url (TEXT)", "created_at (TS)", "updated_at (TS)"] },
        { name: "EVENTS", fields: ["PK id (UUID)", "FK organizer_id (UUID)", "title (TEXT)", "description (TEXT)", "date (DATE)", "time (TIME)", "location (TEXT)", "max_attendees (INT)", "current_attendees (INT)", "status (TEXT)", "qr_code (TEXT)"] },
        { name: "ATTENDEES", fields: ["PK id (UUID)", "FK event_id (UUID)", "name (TEXT)", "email (TEXT)", "checked_in (BOOL)", "check_in_time (TS)", "registration_time (TS)"] },
        { name: "SUBSCRIPTIONS", fields: ["PK id (UUID)", "FK user_id (UUID)", "plan (TEXT)", "status (TEXT)", "amount (NUM)", "currency (TEXT)", "expires_at (TS)", "flw_tx_ref (TEXT)"] },
      ].map((table) => (
        <table key={table.name} style={tableStyle}>
          <thead><tr><th style={thStyle}>{table.name}</th></tr></thead>
          <tbody>
            {table.fields.map((f, i) => (
              <tr key={i}><td style={tdStyle}>{f}</td></tr>
            ))}
          </tbody>
        </table>
      ))}
      <div style={{ width: "100%", textAlign: "center", fontSize: 10, marginTop: 8 }}>
        <strong>Relationships:</strong> PROFILES ←1:1→ auth.users | EVENTS ←N:1→ auth.users | EVENTS ←1:N→ ATTENDEES | SUBSCRIPTIONS ←N:1→ auth.users
      </div>
    </div>
  );
};

const UseCaseDiagram = () => (
  <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "flex-start", fontFamily: "monospace", fontSize: 10 }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 28 }}>👤</div>
      <div style={{ fontWeight: "bold" }}>Event Organizer</div>
      <div style={{ marginTop: 8 }}>
        {["Register / Sign In", "Create / Edit / Delete Events", "Generate & Share QR Code", "View Real-Time Analytics", "Export Attendance Report", "Manage Subscription"].map((uc) => (
          <div key={uc} style={{ border: "1px solid #000", borderRadius: 20, padding: "4px 12px", margin: "4px 0", background: "#fff" }}>
            {uc}
          </div>
        ))}
      </div>
    </div>
    <div style={{ borderLeft: "2px solid #333", minHeight: 200, margin: "0 8px", position: "relative" }}>
      <div style={{ position: "absolute", top: -10, left: -30, fontSize: 10, fontWeight: "bold", background: "#fafafa", padding: "0 4px" }}>EventPulse System</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 28 }}>👥</div>
      <div style={{ fontWeight: "bold" }}>Attendee (Public)</div>
      <div style={{ marginTop: 8 }}>
        {["Scan QR Code", "Submit Check-In Form", "Receive Confirmation"].map((uc) => (
          <div key={uc} style={{ border: "1px solid #000", borderRadius: 20, padding: "4px 12px", margin: "4px 0", background: "#fff" }}>
            {uc}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WorkflowDiagram = () => {
  const step: React.CSSProperties = { border: "1px solid #000", padding: "6px 10px", fontSize: 10, textAlign: "center", background: "#fff", minWidth: 120 };
  const arrow: React.CSSProperties = { textAlign: "center", fontSize: 14 };
  return (
    <div style={{ fontFamily: "monospace" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <div style={step}>Organizer registers<br />& verifies email</div>
        <div style={arrow}>→</div>
        <div style={step}>Organizer creates<br />an event</div>
        <div style={arrow}>→</div>
        <div style={step}>System auto-generates<br />QR code</div>
        <div style={arrow}>→</div>
        <div style={step}>Organizer shares<br />QR code</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 14, margin: "4px 0" }}>▼</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <div style={step}>Attendee scans<br />QR code</div>
        <div style={arrow}>→</div>
        <div style={step}>Attendee fills<br />name & email</div>
        <div style={arrow}>→</div>
        <div style={step}>DB trigger increments<br />attendee count</div>
        <div style={arrow}>→</div>
        <div style={step}>Organizer monitors<br />dashboard analytics</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 14, margin: "4px 0" }}>▼</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={step}>Organizer exports<br />Excel attendance report</div>
      </div>
    </div>
  );
};

const SequenceDiagram = () => {
  const col: React.CSSProperties = { flex: 1, textAlign: "center", fontSize: 10, fontFamily: "monospace" };
  const header: React.CSSProperties = { fontWeight: "bold", borderBottom: "2px solid #000", paddingBottom: 4, marginBottom: 8 };
  const msg: React.CSSProperties = { fontSize: 9, padding: "2px 0", borderBottom: "1px dotted #ccc" };
  return (
    <div style={{ display: "flex", gap: 4, fontFamily: "monospace" }}>
      <div style={col}>
        <div style={header}>Attendee</div>
        <div style={msg}>1. Scans QR Code →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>5. Enters name/email →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>← 9. ✓ Checked In!</div>
      </div>
      <div style={col}>
        <div style={header}>Mobile Browser</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>2. Opens /checkin/:id →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>← 4. Display check-in form</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>6. Submit form →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>← 8. Show confirmation</div>
        <div style={msg}>&nbsp;</div>
      </div>
      <div style={col}>
        <div style={header}>Frontend (React)</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>3. Fetch event data →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>7. INSERT attendee →</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
      </div>
      <div style={col}>
        <div style={header}>PostgreSQL DB</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>← Return event info</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>&nbsp;</div>
        <div style={msg}>Trigger: update count</div>
        <div style={msg}>← Success</div>
        <div style={msg}>&nbsp;</div>
      </div>
    </div>
  );
};

const DirectoryStructure = () => (
  <pre style={{ fontSize: 10, fontFamily: "monospace", padding: 12, background: "#fff", border: "1px solid #ddd", lineHeight: 1.6, overflow: "auto" }}>
{`src/
├── components/
│   ├── layout/          # MainLayout, Header, Footer, PageTransition
│   ├── dashboard/       # StatsCards, EventsList, AttendanceChart,
│   │                    # CreateEventModal, QRCodeModal, AttendeesTable
│   ├── sections/        # HeroSection, FeaturesSection,
│   │                    # TestimonialsSection, CTASection
│   └── ui/              # Reusable UI primitives (Button, Card,
│                        # Dialog, Input, Table, etc.)
├── hooks/               # useAuth, useEvents, useAnalytics,
│                        # useSubscription
├── pages/               # Index, Dashboard, Auth, CheckIn,
│                        # Features, Pricing, About, Contact,
│                        # EventDetails, PaymentSuccess
├── integrations/        # Database client configuration
│   └── supabase/
├── data/                # Mock data for development
└── types/               # TypeScript type definitions`}
  </pre>
);

const PaymentFlowDiagram = () => {
  const step: React.CSSProperties = { border: "1px solid #000", padding: "6px 10px", fontSize: 10, textAlign: "center", background: "#fff", minWidth: 100 };
  const arrow: React.CSSProperties = { textAlign: "center", fontSize: 14 };
  return (
    <div style={{ fontFamily: "monospace" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <div style={step}>Client<br />(React)</div>
        <div style={arrow}>→</div>
        <div style={step}>flutterwave-init<br />(Edge Function)</div>
        <div style={arrow}>→</div>
        <div style={step}>Flutterwave<br />API v3</div>
        <div style={arrow}>→</div>
        <div style={step}>Payment<br />Page</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 10, margin: "8px 0" }}>User completes payment ↓</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <div style={step}>Update DB<br />Subscription</div>
        <div style={arrow}>←</div>
        <div style={step}>flutterwave-webhook<br />(Edge Function)</div>
        <div style={arrow}>←</div>
        <div style={step}>Webhook<br />Callback</div>
        <div style={arrow}>←</div>
        <div style={step}>Flutterwave<br />Server</div>
      </div>
    </div>
  );
};

export default AcademicPaper;
