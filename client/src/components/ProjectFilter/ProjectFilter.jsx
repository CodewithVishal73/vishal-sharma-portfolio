import React from 'react';
import styles from './ProjectFilter.module.css';

export default function ProjectFilter({
  tags,
  activeTag,
  onSelectTag,
  sortBy,
  onSelectSort,
  totalCount,
  filteredCount,
}) {
  return (
    <div className={styles.filterBar} role="region" aria-label="Project filter and sorting controls">
      {/* Top Controls: Result Count & Sort Selector */}
      <div className={styles.controlsRow}>
        <div className={styles.resultCount} aria-live="polite">
          Showing <span className={styles.highlightCount}>{filteredCount}</span> of{' '}
          {totalCount} projects {activeTag !== 'All' && <span>(filtered by #{activeTag})</span>}
        </div>

        <div className={styles.sortWrapper}>
          <label htmlFor="project-sort-select" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="project-sort-select"
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="newest">Newest first</option>
            <option value="az">Name (A — Z)</option>
          </select>
        </div>
      </div>

      {/* Dynamic Filter Chips Row */}
      <div className={styles.chipList} role="tablist" aria-label="Filter projects by technology or area">
        {tags.map((tag) => {
          const isActive = activeTag.toLowerCase() === tag.toLowerCase();
          return (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTag(tag)}
              className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
            >
              {tag === 'All' ? 'All Projects' : `#${tag}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectEmptyState({ activeTag, onClear }) {
  return (
    <div className={styles.emptyState}>
      <h4 className={styles.emptyTitle}>No matching projects found</h4>
      <p className={styles.emptyText}>
        No projects match the filter tag <strong>#{activeTag}</strong>. Try selecting another tag or clear your filter.
      </p>
      <button
        type="button"
        onClick={onClear}
        className={`${styles.chip} ${styles.chipActive}`}
      >
        Clear filter (Show All)
      </button>
    </div>
  );
}
