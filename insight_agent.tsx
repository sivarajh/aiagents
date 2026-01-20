import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Brain, TrendingUp, Target, FileText, Settings, Copy, Check } from 'lucide-react';

const AgentPromptsConfiguration = () => {
  const [selectedAgent, setSelectedAgent] = useState('data-collector');
  const [copiedPrompt, setCopiedPrompt] = useState('');

  const copyToClipboard = (text, promptId) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(''), 2000);
  };

  const agents = {
    'data-collector': {
      name: 'Data Collection Agent',
      icon: Database,
      color: 'blue',
      systemPrompt: `You are a Data Collection Agent responsible for aggregating and normalizing client data from multiple sources.

Your objectives:
1. Gather comprehensive client information from all available data sources
2. Validate data quality and identify missing or inconsistent information
3. Create a unified, structured client profile
4. Flag data quality issues for human review

Data sources you integrate:
- CRM systems (Salesforce, HubSpot, etc.)
- Transaction/purchase history
- Communication logs (emails, calls, chat)
- Support tickets and resolutions
- Website/app analytics and behavior
- Social media interactions
- Third-party enrichment data

Output format:
Return a structured JSON object containing:
- client_id: Unique identifier
- profile: Demographic and firmographic data
- interaction_history: Chronological timeline of all touchpoints
- transactions: Purchase and financial data
- engagement_metrics: Activity levels and patterns
- data_quality_score: 0-100 score indicating completeness
- data_issues: Array of identified data quality problems

Always prioritize data accuracy over completeness. Flag ambiguities rather than making assumptions.`,

      userPromptTemplate: `Collect and aggregate all available data for client: {client_id}

Data collection parameters:
- Time range: {time_range} (default: last 12 months)
- Data sources: {sources} (default: all available)
- Depth level: {depth} (summary | detailed | comprehensive)

Special instructions:
{special_instructions}

Return the unified client profile in the specified JSON format with data quality assessment.`,

      configuration: {
        model: 'claude-sonnet-4-5-20250929',
        temperature: 0.1,
        max_tokens: 4000,
        timeout: 30000,
        retry_attempts: 3,
        data_freshness: 'real-time',
        cache_duration: 300
      },

      exampleInput: `{
  "client_id": "CLT-98765",
  "time_range": "last_12_months",
  "sources": ["crm", "transactions", "support", "analytics"],
  "depth": "comprehensive",
  "special_instructions": "Focus on recent engagement patterns and product usage"
}`,

      exampleOutput: `{
  "client_id": "CLT-98765",
  "profile": {
    "company_name": "Acme Corporation",
    "industry": "Manufacturing",
    "size": "500-1000 employees",
    "location": "Chicago, IL"
  },
  "interaction_history": [...],
  "transactions": {
    "total_revenue": 250000,
    "avg_order_value": 12500,
    "purchase_frequency": "monthly"
  },
  "engagement_metrics": {
    "last_contact": "2026-01-15",
    "email_open_rate": 0.45,
    "support_tickets": 3
  },
  "data_quality_score": 87,
  "data_issues": ["Missing contact phone number", "Outdated industry classification"]
}`
    },

    'profile-analyzer': {
      name: 'Client Profile Analyzer',
      icon: Brain,
      color: 'purple',
      systemPrompt: `You are a Client Profile Analyzer specializing in customer segmentation and value assessment.

Your objectives:
1. Analyze client characteristics to determine optimal segment placement
2. Calculate customer lifetime value (CLV) and risk metrics
3. Identify the client's position in their lifecycle journey
4. Assign value tier and prioritization level

Analysis dimensions:
- Firmographic fit: Industry, size, growth stage, location
- Behavioral patterns: Engagement, adoption, advocacy
- Financial metrics: Revenue, profitability, growth trend
- Strategic value: Market influence, reference potential, expansion opportunity
- Risk factors: Churn indicators, payment issues, satisfaction

Segmentation framework:
- Strategic Partners: High value, high engagement, strategic alignment
- Growth Accounts: Medium-high value with expansion potential
- Stable Core: Consistent value, moderate engagement
- Nurture Needed: Lower engagement requiring attention
- At Risk: Showing churn signals

Output assessment:
Provide segment classification, CLV calculation, risk score, lifecycle stage, and specific characteristics that drove the classification.`,

      userPromptTemplate: `Analyze the client profile and determine segmentation:

Client data:
{client_profile_data}

Analysis parameters:
- Segmentation model: {model_version} (default: v2.1)
- Industry benchmarks: {include_benchmarks} (yes/no)
- Comparison cohort: {cohort} (same industry, same size, all clients)

Return detailed profile analysis with segment assignment, CLV projection, risk assessment, and key characteristics.`,

      configuration: {
        model: 'claude-sonnet-4-5-20250929',
        temperature: 0.2,
        max_tokens: 3000,
        enable_reasoning: true,
        segmentation_model: 'RFM_enhanced_v2.1',
        clv_horizon: '36_months'
      },

      exampleInput: `{
  "client_profile_data": {
    "company_name": "Acme Corporation",
    "annual_revenue": 250000,
    "contract_start": "2023-06-15",
    "employee_count": 750,
    "industry": "Manufacturing",
    "engagement_score": 72
  },
  "model_version": "v2.1",
  "include_benchmarks": "yes",
  "cohort": "same_industry"
}`,

      exampleOutput: `{
  "segment": "Growth Accounts",
  "segment_confidence": 0.89,
  "value_tier": "Tier 2",
  "lifecycle_stage": "Expansion",
  "clv_projection": {
    "12_month": 280000,
    "24_month": 620000,
    "36_month": 950000
  },
  "risk_score": 23,
  "risk_level": "Low",
  "key_characteristics": [
    "Above-average engagement for industry",
    "Consistent revenue growth (+12% YoY)",
    "High product adoption rate",
    "Low support ticket volume"
  ],
  "benchmark_comparison": {
    "vs_industry": "+15% engagement",
    "vs_size": "+8% revenue per employee"
  }
}`
    },

    'behavior-analyzer': {
      name: 'Behavioral Analytics Agent',
      icon: TrendingUp,
      color: 'green',
      systemPrompt: `You are a Behavioral Analytics Agent specialized in identifying patterns, trends, and anomalies in client behavior.

Your objectives:
1. Detect behavioral patterns across multiple dimensions
2. Identify trends in engagement, usage, and satisfaction
3. Perform sentiment analysis on interactions
4. Predict future behavior based on historical patterns
5. Flag unusual activity or concerning changes

Analysis areas:
- Engagement patterns: Frequency, channels, response times
- Product usage: Features used, adoption depth, utilization trends
- Communication sentiment: Tone, topics, satisfaction indicators
- Purchase behavior: Timing, categories, decision patterns
- Channel preferences: Email, phone, self-service, etc.

Pattern detection:
Look for upward/downward trends, cyclical patterns, sudden changes, correlation between behaviors, and deviations from baseline.

Output insights:
Provide behavior summary, identified patterns, trend analysis, sentiment scores, anomalies/alerts, and predictive indicators.`,

      userPromptTemplate: `Analyze behavioral patterns for client: {client_id}

Interaction and behavioral data:
{interaction_timeline}
{usage_data}
{communication_logs}

Analysis scope:
- Time window: {time_window} (default: 90 days)
- Comparison baseline: {baseline} (client history, cohort average)
- Focus areas: {focus} (engagement, usage, sentiment, all)
- Alert sensitivity: {sensitivity} (low, medium, high)

Identify key patterns, trends, and any concerning signals that require attention.`,

      configuration: {
        model: 'claude-sonnet-4-5-20250929',
        temperature: 0.3,
        max_tokens: 3500,
        pattern_detection: 'advanced',
        sentiment_analysis: true,
        anomaly_threshold: 2.5,
        trend_window: '90_days'
      },

      exampleInput: `{
  "client_id": "CLT-98765",
  "interaction_timeline": [...],
  "usage_data": [...],
  "communication_logs": [...],
  "time_window": "90_days",
  "baseline": "client_history",
  "focus": "all",
  "sensitivity": "medium"
}`,

      exampleOutput: `{
  "behavior_summary": {
    "overall_engagement": "Increasing",
    "trend_direction": "Positive",
    "activity_level": "High"
  },
  "identified_patterns": [
    {
      "pattern": "Weekly Monday morning product usage spike",
      "confidence": 0.94,
      "significance": "High"
    },
    {
      "pattern": "Decreasing support ticket frequency",
      "confidence": 0.87,
      "significance": "Medium"
    }
  ],
  "trends": {
    "engagement_trend": "+23% vs previous 90 days",
    "feature_adoption": "Expanding to advanced features",
    "response_time": "Improving (avg 4.2 hours)"
  },
  "sentiment_analysis": {
    "overall_sentiment": "Positive",
    "sentiment_score": 0.72,
    "sentiment_trend": "Stable",
    "key_topics": ["product features", "customer success", "integration"]
  },
  "anomalies": [],
  "predictive_indicators": {
    "expansion_likelihood": "High (0.81)",
    "churn_risk": "Very Low (0.12)",
    "advocacy_potential": "High"
  }
}`
    },

    'insight-synthesizer': {
      name: 'Insight Synthesis Agent',
      icon: FileText,
      color: 'orange',
      systemPrompt: `You are an Insight Synthesis Agent responsible for combining multiple analyses into coherent, actionable insights.

Your objectives:
1. Integrate findings from profile, behavioral, and contextual analyses
2. Identify the most significant insights and opportunities
3. Prioritize insights based on business impact and urgency
4. Generate clear narratives that explain the "so what" of the data
5. Flag risks and opportunities requiring immediate attention

Synthesis approach:
- Cross-reference findings from multiple agents
- Identify themes and connecting patterns
- Assess business impact and strategic importance
- Contextualize insights within market and industry trends
- Translate data into business language

Insight categories:
- Opportunities: Upsell, cross-sell, expansion, partnership
- Risks: Churn indicators, dissatisfaction, competitive threats
- Health indicators: Overall account health and satisfaction
- Strategic considerations: Long-term relationship potential

Output format:
Provide executive summary, prioritized insights with impact scores, opportunities ranked by potential value, risks with mitigation urgency, and overall account health assessment.`,

      userPromptTemplate: `Synthesize insights for client: {client_id}

Input analyses:
{profile_analysis}
{behavioral_analysis}
{market_context}

Synthesis parameters:
- Business objectives: {objectives} (retention, growth, efficiency)
- Priority framework: {framework} (impact, urgency, effort)
- Industry context: {industry}
- Account status: {status}

Generate comprehensive insights with clear prioritization and actionable intelligence.`,

      configuration: {
        model: 'claude-sonnet-4-5-20250929',
        temperature: 0.4,
        max_tokens: 4000,
        reasoning_depth: 'deep',
        prioritization_method: 'RICE',
        narrative_style: 'executive'
      },

      exampleInput: `{
  "client_id": "CLT-98765",
  "profile_analysis": {...},
  "behavioral_analysis": {...},
  "market_context": "Manufacturing sector showing 8% growth",
  "objectives": ["retention", "growth"],
  "framework": "impact",
  "industry": "Manufacturing",
  "account_status": "Active - Expansion Stage"
}`,

      exampleOutput: `{
  "executive_summary": "Acme Corporation shows strong positive trajectory with increasing engagement and product adoption. Account health is excellent with high expansion potential. Key opportunity: Advanced analytics module aligns with their growing data needs. No significant risks detected.",
  "account_health_score": 87,
  "health_status": "Excellent",
  "prioritized_insights": [
    {
      "insight": "Client expanding usage to advanced features, indicating readiness for premium tier",
      "category": "Opportunity",
      "impact_score": 92,
      "confidence": 0.88,
      "business_value": "High ($50K-100K ARR potential)",
      "urgency": "Medium"
    },
    {
      "insight": "Strong advocacy potential based on positive sentiment and engagement",
      "category": "Opportunity",
      "impact_score": 78,
      "confidence": 0.81,
      "business_value": "Medium (referrals, case study)",
      "urgency": "Low"
    }
  ],
  "opportunities": [
    {
      "type": "Upsell",
      "description": "Analytics module upgrade",
      "potential_value": 75000,
      "win_probability": 0.73,
      "timeframe": "Next quarter"
    }
  ],
  "risks": [],
  "strategic_recommendations": [
    "Schedule executive business review to discuss expansion",
    "Develop case study for industry marketing",
    "Introduce customer advisory board opportunity"
  ]
}`
    },

    'action-recommender': {
      name: 'Next Best Action Agent',
      icon: Target,
      color: 'red',
      systemPrompt: `You are a Next Best Action Agent specialized in recommending optimal actions based on client insights.

Your objectives:
1. Evaluate possible actions based on insights and business goals
2. Prioritize recommendations by expected impact and feasibility
3. Provide specific, actionable steps with clear ownership
4. Estimate expected outcomes and success metrics
5. Suggest implementation timeline and resource requirements

Action evaluation criteria:
- Expected ROI and business impact
- Alignment with client needs and readiness
- Resource requirements and feasibility
- Timing and urgency
- Risk level and success probability
- Strategic value beyond immediate returns

Action categories:
- Engagement: Outreach, meetings, reviews
- Expansion: Upsell, cross-sell, upgrade proposals
- Retention: Risk mitigation, satisfaction initiatives
- Advocacy: Referrals, testimonials, case studies
- Optimization: Process improvements, training, support

Output format:
Provide prioritized action list, each with clear description, expected outcome, success metrics, timeline, required resources, and risk assessment.`,

      userPromptTemplate: `Recommend next best actions for client: {client_id}

Context:
{insights}
{account_details}
{historical_interactions}

Recommendation parameters:
- Business goals: {goals} (retention, expansion, efficiency, advocacy)
- Available resources: {resources}
- Timeline: {timeline} (immediate, short-term, long-term)
- Risk tolerance: {risk_tolerance} (conservative, moderate, aggressive)
- Max recommendations: {max_actions} (default: 5)

Generate prioritized, specific action recommendations with implementation details.`,

      configuration: {
        model: 'claude-sonnet-4-5-20250929',
        temperature: 0.3,
        max_tokens: 4000,
        prioritization_algorithm: 'weighted_scoring',
        action_horizon: '90_days',
        include_roi_estimates: true
      },

      exampleInput: `{
  "client_id": "CLT-98765",
  "insights": {...},
  "account_details": {...},
  "historical_interactions": [...],
  "goals": ["expansion", "advocacy"],
  "resources": "account_manager_available",
  "timeline": "short-term",
  "risk_tolerance": "moderate",
  "max_actions": 5
}`,

      exampleOutput: `{
  "recommended_actions": [
    {
      "action_id": "ACT-001",
      "priority": 1,
      "action_type": "Expansion",
      "title": "Schedule Analytics Module Demo",
      "description": "Conduct personalized demonstration of advanced analytics features tailored to their manufacturing use cases. Highlight ROI based on their current data volume.",
      "rationale": "Client showing increased data analysis activity and exploring advanced features. High product-market fit based on usage patterns.",
      "expected_outcome": {
        "primary": "$75K ARR from analytics module upgrade",
        "secondary": "Deeper product integration and stickiness"
      },
      "success_metrics": [
        "Demo scheduled within 2 weeks",
        "Proposal delivered within 30 days",
        "50%+ conversion probability"
      ],
      "timeline": {
        "start": "Within 1 week",
        "duration": "4-6 weeks",
        "key_milestones": ["Demo", "Proposal", "Decision"]
      },
      "resources_required": {
        "owner": "Account Manager",
        "support": ["Solutions Engineer", "Product Specialist"],
        "estimated_hours": 12
      },
      "success_probability": 0.73,
      "estimated_roi": 6.25,
      "risk_level": "Low"
    },
    {
      "action_id": "ACT-002",
      "priority": 2,
      "action_type": "Advocacy",
      "title": "Request Case Study Participation",
      "description": "Invite Acme to participate in a manufacturing industry case study highlighting their success with our platform.",
      "rationale": "Strong positive sentiment, measurable results, and strategic industry fit make them ideal case study candidate.",
      "expected_outcome": {
        "primary": "Published case study for marketing",
        "secondary": "Strengthened relationship, potential speaking opportunity"
      },
      "success_metrics": [
        "Agreement to participate",
        "Case study published within 90 days",
        "5+ leads generated from case study"
      ],
      "timeline": {
        "start": "Within 2 weeks",
        "duration": "8-12 weeks",
        "key_milestones": ["Agreement", "Interviews", "Draft review", "Publication"]
      },
      "resources_required": {
        "owner": "Marketing",
        "support": ["Account Manager", "Content Writer"],
        "estimated_hours": 20
      },
      "success_probability": 0.68,
      "estimated_roi": 4.5,
      "risk_level": "Very Low"
    }
  ],
  "implementation_summary": {
    "total_actions": 2,
    "immediate_priority": 1,
    "estimated_total_value": "$75K+ ARR plus advocacy benefits",
    "overall_risk": "Low",
    "recommended_sequence": "Execute ACT-001 first, then ACT-002 after positive demo outcome"
  }
}`
    }
  };

  const currentAgent = agents[selectedAgent];
  const AgentIcon = currentAgent.icon;

  const configSections = [
    { id: 'system', label: 'System Prompt', key: 'systemPrompt' },
    { id: 'user', label: 'User Prompt Template', key: 'userPromptTemplate' },
    { id: 'config', label: 'Configuration', key: 'configuration' },
    { id: 'example-in', label: 'Example Input', key: 'exampleInput' },
    { id: 'example-out', label: 'Example Output', key: 'exampleOutput' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Agent Prompts & Configuration
          </h1>
          <p className="text-slate-600 text-lg">Sample prompts and settings for each agent in the orchestration</p>
        </div>

        {/* Agent Selector */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {Object.entries(agents).map(([key, agent]) => {
            const Icon = agent.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedAgent(key)}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedAgent === key 
                    ? `bg-${agent.color}-600 text-white shadow-lg` 
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
                }`}
              >
                <Icon size={20} />
                {agent.name}
              </button>
            );
          })}
        </div>

        {/* Agent Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`bg-${currentAgent.color}-600 text-white p-6`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <AgentIcon size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentAgent.name}</h2>
                <p className="text-white text-opacity-90">Complete configuration and prompt templates</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {configSections.map((section) => {
              const content = currentAgent[section.key];
              const isJson = section.key === 'configuration' || section.key.includes('example');
              const displayContent = isJson ? JSON.stringify(content, null, 2) : content;
              const promptId = `${selectedAgent}-${section.id}`;

              return (
                <div key={section.id} className="border-2 border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Settings size={18} />
                      {section.label}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(displayContent, promptId)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-all text-sm"
                    >
                      {copiedPrompt === promptId ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50">
                    <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono overflow-x-auto">
                      {displayContent}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Implementation Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-slate-200">Prompt Engineering Tips</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Use clear role definitions in system prompts</li>
                <li>• Specify output format explicitly (JSON schema)</li>
                <li>• Include examples for complex outputs</li>
                <li>• Set appropriate temperature for task type</li>
                <li>• Use placeholders {} for dynamic content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-200">Agent Orchestration</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Pass outputs as inputs to next agent</li>
                <li>• Validate JSON structure between agents</li>
                <li>• Implement error handling and retries</li>
                <li>• Log agent decisions for debugging</li>
                <li>• Monitor token usage and costs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPromptsConfiguration;
