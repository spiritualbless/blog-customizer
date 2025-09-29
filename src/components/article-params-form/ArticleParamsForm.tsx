import { useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { 
	fontFamilyOptions, 
	fontColors, 
	backgroundColors, 
	contentWidthArr, 
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType 
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onStateChange }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const handleFontFamilyChange = (option: typeof fontFamilyOptions[0]) => {
		setFormState(prev => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: typeof fontColors[0]) => {
		setFormState(prev => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: typeof backgroundColors[0]) => {
		setFormState(prev => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: typeof contentWidthArr[0]) => {
		setFormState(prev => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: typeof fontSizeOptions[0]) => {
		setFormState(prev => ({ ...prev, fontSizeOption: option }));
	};

	const handleToggleSidebar = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onStateChange(formState);
		setIsMenuOpen(false);
	};

	const handleReset = (e?: React.FormEvent) => {
		e?.preventDefault();
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggleSidebar} />
			<aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
					<div className={styles.selectsContainer}>
						<Select
							title="Шрифт"
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
							placeholder="Выберите шрифт"
						/>
						
						<div className={styles.spacer}></div>
						
						<RadioGroup
							name="fontSize"
							title="Размер шрифта"
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
						
						<div className={styles.spacer}></div>
						
						<Select
							title="Цвет шрифта"
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
							placeholder="Выберите цвет"
						/>
						
						<div className={styles.spacerDouble}></div>
						
						<Select
							title="Цвет фона"
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBackgroundColorChange}
							placeholder="Выберите фон"
						/>
						
						<div className={styles.spacer}></div>
						
						<Select
							title="Ширина контента"
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
							placeholder="Выберите ширину"
						/>
						
						<div className={styles.spacerToBottom}></div>
					</div>
					
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='button' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
