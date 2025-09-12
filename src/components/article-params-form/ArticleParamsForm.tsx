import { useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { 
	fontFamilyOptions, 
	fontColors, 
	backgroundColors, 
	contentWidthArr, 
	fontSizeOptions 
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	formState,
	onFormChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleFontFamilyChange = (selected: OptionType) => {
		onFormChange({
			...formState,
			fontFamilyOption: selected,
		});
	};

	const handleFontSizeChange = (selected: OptionType) => {
		onFormChange({
			...formState,
			fontSizeOption: selected,
		});
	};

	const handleFontColorChange = (selected: OptionType) => {
		onFormChange({
			...formState,
			fontColor: selected,
		});
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		onFormChange({
			...formState,
			backgroundColor: selected,
		});
	};

	const handleContentWidthChange = (selected: OptionType) => {
		onFormChange({
			...formState,
			contentWidth: selected,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside 
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formContent}>
						<Select
							title="Шрифт"
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>
						
						<Separator />
						
						<RadioGroup
							title="Размер шрифта"
							name="fontSize"
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
						/>
						
						<Separator />
						
						<Select
							title="Цвет шрифта"
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>
						
						<Separator />
						
						<Select
							title="Цвет фона"
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>
						
						<Separator />
						
						<RadioGroup
							title="Ширина контента"
							name="contentWidth"
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>
					</div>
					
					<div className={styles.bottomContainer}>
						<Button 
							title='Сбросить' 
							htmlType='button' 
							type='clear' 
							onClick={handleReset}
						/>
						<Button 
							title='Применить' 
							htmlType='submit' 
							type='apply' 
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
