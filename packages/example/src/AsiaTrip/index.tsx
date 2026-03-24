import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const COUNTRIES = [
	{
		flag: '🇰🇷',
		name: 'Corée du Sud',
		duration: '10–14 jours',
		budget: '1 500 €',
		color: '#CD2E3A',
		accent: '#0047A0',
		bg: '#fff0f0',
		cities: ['Séoul', 'Busan', 'Gyeongju', 'Jeju'],
		vibes: ['K-pop & culture', 'Temples bouddhistes', 'Street food', 'Hanok villages'],
		emoji: '🏯',
	},
	{
		flag: '🇯🇵',
		name: 'Japon',
		duration: '14–18 jours',
		budget: '2 500 €',
		color: '#BC002D',
		accent: '#BC002D',
		bg: '#fff5f5',
		cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara'],
		vibes: ['Temples & jardins zen', 'Gastronomie', 'Forêt de bambous', 'Mont Fuji'],
		emoji: '⛩️',
	},
	{
		flag: '🇹🇭',
		name: 'Thaïlande',
		duration: '6–8 semaines',
		budget: '2 500 €',
		color: '#A51931',
		accent: '#2D2A4A',
		bg: '#fffaf0',
		cities: ['Bangkok', 'Chiang Mai', 'Koh Samui', 'Phuket', 'Pai'],
		vibes: ['Plages paradisiaques', 'Temples dorés', 'Cuisine épicée', 'Jungle & éléphants'],
		emoji: '🐘',
	},
	{
		flag: '🇻🇳',
		name: 'Vietnam',
		duration: '5–6 semaines',
		budget: '1 500 €',
		color: '#DA251D',
		accent: '#FFCD00',
		bg: '#fffff0',
		cities: ['Hanoi', 'Baie d\'Halong', 'Hội An', 'Đà Nẵng', 'Hô Chi Minh-Ville'],
		vibes: ['Baie d\'Halong', 'Vieille ville de Hội An', 'Rizières en terrasses', 'Cuisine de rue'],
		emoji: '🛵',
	},
];

const SECTION_DURATION = 150; // frames per country
const INTRO_DURATION = 90;
const BUDGET_DURATION = 120;
const TOTAL_FRAMES =
	INTRO_DURATION + COUNTRIES.length * SECTION_DURATION + BUDGET_DURATION;

function useFadeIn(frame: number, delay = 0, duration = 30) {
	return interpolate(frame - delay, [0, duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}

function useSlideUp(
	frame: number,
	fps: number,
	delay = 0,
	distance = 60,
) {
	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 18, stiffness: 80, mass: 0.8},
	});
	return {
		opacity: interpolate(frame - delay, [0, 15], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
		transform: `translateY(${(1 - progress) * distance}px)`,
	};
}

// ── Intro slide ──────────────────────────────────────────────────────────────

const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleStyle = useSlideUp(frame, fps, 5);
	const badgesStyle = useSlideUp(frame, fps, 20, 40);
	const statsStyle = useSlideUp(frame, fps, 35, 30);

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: '"Segoe UI", system-ui, sans-serif',
				color: 'white',
				overflow: 'hidden',
			}}
		>
			{/* Stars background */}
			{[...Array(30)].map((_, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						width: Math.random() * 3 + 1,
						height: Math.random() * 3 + 1,
						borderRadius: '50%',
						background: 'white',
						opacity: interpolate(
							frame,
							[0, 60],
							[0, Math.random() * 0.7 + 0.3],
							{extrapolateRight: 'clamp'},
						),
						top: `${(i * 37 + 13) % 100}%`,
						left: `${(i * 53 + 7) % 100}%`,
					}}
				/>
			))}

			{/* Emoji flags row */}
			<div
				style={{
					...badgesStyle,
					display: 'flex',
					gap: 24,
					marginBottom: 32,
					fontSize: 52,
				}}
			>
				{COUNTRIES.map((c) => (
					<span key={c.name}>{c.flag}</span>
				))}
			</div>

			{/* Main title */}
			<div
				style={{
					...titleStyle,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontSize: 74,
						fontWeight: 800,
						letterSpacing: -2,
						background: 'linear-gradient(90deg, #f8d16b, #f97316, #ec4899)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						marginBottom: 8,
					}}
				>
					Notre Voyage en Asie
				</div>
				<div
					style={{
						fontSize: 28,
						opacity: 0.75,
						fontWeight: 300,
						letterSpacing: 4,
						textTransform: 'uppercase',
					}}
				>
					Octobre 2026 · 4–5 mois d'aventure
				</div>
			</div>

			{/* Stats row */}
			<div
				style={{
					...statsStyle,
					display: 'flex',
					gap: 48,
					marginTop: 48,
				}}
			>
				{[
					{label: 'Budget total', value: '20 000 €', icon: '💰'},
					{label: 'Destinations', value: '4 pays', icon: '🗺️'},
					{label: 'Voyageurs', value: '2 amoureux', icon: '❤️'},
					{label: 'Durée', value: '~4–5 mois', icon: '📅'},
				].map((stat) => (
					<div
						key={stat.label}
						style={{
							textAlign: 'center',
							background: 'rgba(255,255,255,0.08)',
							backdropFilter: 'blur(10px)',
							padding: '20px 28px',
							borderRadius: 20,
							border: '1px solid rgba(255,255,255,0.15)',
						}}
					>
						<div style={{fontSize: 32, marginBottom: 6}}>{stat.icon}</div>
						<div
							style={{
								fontSize: 26,
								fontWeight: 700,
								background: 'linear-gradient(90deg, #f8d16b, #f97316)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							}}
						>
							{stat.value}
						</div>
						<div style={{fontSize: 14, opacity: 0.6, marginTop: 4}}>
							{stat.label}
						</div>
					</div>
				))}
			</div>

			{/* Route line */}
			<div
				style={{
					position: 'absolute',
					bottom: 60,
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					opacity: useFadeIn(frame, 60),
				}}
			>
				{COUNTRIES.map((c, i) => (
					<React.Fragment key={c.name}>
						<span style={{fontSize: 16, opacity: 0.8}}>{c.flag} {c.name}</span>
						{i < COUNTRIES.length - 1 && (
							<span style={{opacity: 0.4, fontSize: 18}}>→</span>
						)}
					</React.Fragment>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ── Country card ─────────────────────────────────────────────────────────────

const CountryCard: React.FC<{country: (typeof COUNTRIES)[0]}> = ({
	country,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const bgProgress = spring({frame, fps, config: {damping: 20}});
	const headerStyle = useSlideUp(frame, fps, 0, 80);
	const cardsStyle = useSlideUp(frame, fps, 20, 60);
	const citiesStyle = useSlideUp(frame, fps, 35, 50);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${country.bg} 0%, #ffffff 100%)`,
				fontFamily: '"Segoe UI", system-ui, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Colored top banner */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: interpolate(bgProgress, [0, 1], [0, 280]),
					background: `linear-gradient(135deg, ${country.color} 0%, ${country.accent}cc 100%)`,
					overflow: 'hidden',
				}}
			>
				{/* Large flag watermark */}
				<div
					style={{
						position: 'absolute',
						right: 60,
						top: -20,
						fontSize: 200,
						opacity: 0.12,
						lineHeight: 1,
					}}
				>
					{country.flag}
				</div>
			</div>

			{/* Header content */}
			<div
				style={{
					...headerStyle,
					position: 'absolute',
					top: 36,
					left: 70,
					color: 'white',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 20,
						marginBottom: 10,
					}}
				>
					<span style={{fontSize: 72}}>{country.flag}</span>
					<div>
						<div
							style={{
								fontSize: 58,
								fontWeight: 800,
								letterSpacing: -1.5,
								textShadow: '0 2px 20px rgba(0,0,0,0.3)',
							}}
						>
							{country.name}
						</div>
						<div
							style={{
								display: 'flex',
								gap: 16,
								marginTop: 6,
							}}
						>
							<span
								style={{
									background: 'rgba(255,255,255,0.25)',
									padding: '4px 16px',
									borderRadius: 20,
									fontSize: 18,
									fontWeight: 600,
								}}
							>
								📅 {country.duration}
							</span>
							<span
								style={{
									background: 'rgba(255,255,255,0.25)',
									padding: '4px 16px',
									borderRadius: 20,
									fontSize: 18,
									fontWeight: 600,
								}}
							>
								💰 {country.budget} / pers.
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div
				style={{
					position: 'absolute',
					top: 300,
					left: 70,
					right: 70,
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 28,
				}}
			>
				{/* Villes */}
				<div style={cardsStyle}>
					<div
						style={{
							background: 'white',
							borderRadius: 24,
							padding: '28px 32px',
							boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
							border: '1px solid rgba(0,0,0,0.06)',
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: 2,
								color: country.color,
								marginBottom: 16,
							}}
						>
							📍 Étapes clés
						</div>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 10,
							}}
						>
							{country.cities.map((city) => (
								<span
									key={city}
									style={{
										background: `${country.color}15`,
										color: country.color,
										padding: '8px 18px',
										borderRadius: 30,
										fontSize: 18,
										fontWeight: 600,
										border: `1.5px solid ${country.color}30`,
									}}
								>
									{city}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Vibes */}
				<div style={citiesStyle}>
					<div
						style={{
							background: 'white',
							borderRadius: 24,
							padding: '28px 32px',
							boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
							border: '1px solid rgba(0,0,0,0.06)',
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: 2,
								color: country.color,
								marginBottom: 16,
							}}
						>
							{country.emoji} À faire
						</div>
						<ul style={{listStyle: 'none', padding: 0, margin: 0}}>
							{country.vibes.map((v) => (
								<li
									key={v}
									style={{
										padding: '8px 0',
										fontSize: 18,
										color: '#374151',
										borderBottom: '1px solid #f0f0f0',
										display: 'flex',
										alignItems: 'center',
										gap: 10,
									}}
								>
									<span
										style={{
											width: 8,
											height: 8,
											borderRadius: '50%',
											background: country.color,
											flexShrink: 0,
										}}
									/>
									{v}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Progress bar at bottom */}
			<div
				style={{
					position: 'absolute',
					bottom: 36,
					left: 70,
					right: 70,
					display: 'flex',
					alignItems: 'center',
					gap: 16,
				}}
			>
				{COUNTRIES.map((c, i) => {
					const isActive = c.name === country.name;
					return (
						<React.Fragment key={c.name}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									opacity: isActive ? 1 : 0.4,
								}}
							>
								<span style={{fontSize: 20}}>{c.flag}</span>
								<span
									style={{
										fontSize: 15,
										fontWeight: isActive ? 700 : 400,
										color: isActive ? country.color : '#6b7280',
									}}
								>
									{c.name}
								</span>
							</div>
							{i < COUNTRIES.length - 1 && (
								<div
									style={{
										flex: 1,
										height: 2,
										background:
											COUNTRIES.indexOf(c) <
											COUNTRIES.indexOf(country)
												? country.color
												: '#e5e7eb',
										borderRadius: 2,
									}}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// ── Budget slide ──────────────────────────────────────────────────────────────

const BudgetSlide: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleStyle = useSlideUp(frame, fps, 0, 60);
	const totalBudget = 20000;
	const perPerson = 10000;

	const budgetItems = [
		{label: '🇰🇷 Corée du Sud', amount: 3000, color: '#CD2E3A'},
		{label: '🇯🇵 Japon', amount: 5000, color: '#BC002D'},
		{label: '🇹🇭 Thaïlande', amount: 5000, color: '#A51931'},
		{label: '🇻🇳 Vietnam', amount: 3000, color: '#DA251D'},
		{label: '✈️ Vols', amount: 2000, color: '#6366f1'},
		{label: '🛡️ Assurance & divers', amount: 2000, color: '#8b5cf6'},
	];

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
				fontFamily: '"Segoe UI", system-ui, sans-serif',
				color: 'white',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 80px',
			}}
		>
			<div style={{...titleStyle, textAlign: 'center', marginBottom: 50}}>
				<div
					style={{
						fontSize: 52,
						fontWeight: 800,
						background: 'linear-gradient(90deg, #f8d16b, #f97316)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						marginBottom: 8,
					}}
				>
					💰 Budget du voyage
				</div>
				<div style={{fontSize: 22, opacity: 0.6, fontWeight: 300}}>
					20 000 € au total · 10 000 € par personne
				</div>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					gap: 20,
					width: '100%',
					maxWidth: 1400,
				}}
			>
				{budgetItems.map((item, i) => {
					const progress = spring({
						frame: frame - i * 8,
						fps,
						config: {damping: 18, stiffness: 100},
					});
					const barWidth = interpolate(progress, [0, 1], [0, (item.amount / totalBudget) * 100]);
					const opacity = interpolate(
						frame - i * 8,
						[0, 15],
						[0, 1],
						{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
					);

					return (
						<div
							key={item.label}
							style={{
								opacity,
								background: 'rgba(255,255,255,0.07)',
								borderRadius: 20,
								padding: '24px 28px',
								border: '1px solid rgba(255,255,255,0.12)',
								transform: `translateY(${(1 - progress) * 30}px)`,
							}}
						>
							<div style={{fontSize: 22, fontWeight: 600, marginBottom: 12}}>
								{item.label}
							</div>
							<div
								style={{
									fontSize: 32,
									fontWeight: 800,
									color: item.color,
									marginBottom: 12,
								}}
							>
								{item.amount.toLocaleString('fr-FR')} €
							</div>
							<div
								style={{
									height: 8,
									background: 'rgba(255,255,255,0.1)',
									borderRadius: 4,
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										width: `${barWidth}%`,
										height: '100%',
										background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
										borderRadius: 4,
									}}
								/>
							</div>
							<div style={{fontSize: 13, opacity: 0.5, marginTop: 6}}>
								{Math.round((item.amount / totalBudget) * 100)}% du budget total
							</div>
						</div>
					);
				})}
			</div>

			{/* Final message */}
			<div
				style={{
					marginTop: 48,
					textAlign: 'center',
					opacity: interpolate(frame, [60, 90], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
				}}
			>
				<div
					style={{
						fontSize: 28,
						fontWeight: 300,
						opacity: 0.7,
					}}
				>
					Bon voyage à vous deux ! 🌏✨
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ── Root composition ──────────────────────────────────────────────────────────

export const AsiaTripPlanner: React.FC = () => {
	return (
		<AbsoluteFill>
			<Sequence durationInFrames={INTRO_DURATION}>
				<Intro />
			</Sequence>

			{COUNTRIES.map((country, i) => (
				<Sequence
					key={country.name}
					from={INTRO_DURATION + i * SECTION_DURATION}
					durationInFrames={SECTION_DURATION}
				>
					<CountryCard country={country} />
				</Sequence>
			))}

			<Sequence
				from={INTRO_DURATION + COUNTRIES.length * SECTION_DURATION}
				durationInFrames={BUDGET_DURATION}
			>
				<BudgetSlide />
			</Sequence>
		</AbsoluteFill>
	);
};

export {TOTAL_FRAMES};
