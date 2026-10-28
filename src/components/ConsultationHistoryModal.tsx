import React, { useState } from 'react';
import { ConsultationRecord } from '../types';
import { X, Trash2, Download, CheckCircle, Clock, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { deleteConsultationRecord, updateConsultationStatus, clearAllConsultations } from '../services/consultationStorage';

interface ConsultationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: ConsultationRecord[];
  onRecordsUpdated: (updated: ConsultationRecord[]) => void;
}

export const ConsultationHistoryModal: React.FC<ConsultationHistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onRecordsUpdated,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = records.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 상담 내역을 삭제하시겠습니까?')) {
      const updated = deleteConsultationRecord(id);
      onRecordsUpdated(updated);
      if (selectedRecordId === id) setSelectedRecordId(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: ConsultationRecord['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = updateConsultationStatus(id, newStatus);
    onRecordsUpdated(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('모든 상담 내역을 삭제하시겠습니까? (로컬스토리지 초기화)')) {
      clearAllConsultations();
      onRecordsUpdated([]);
      setSelectedRecordId(null);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bit_consultations_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">상담 신청 내역 관리</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 tabular-nums">
                총 {records.length}건 (LocalStorage)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              브라우저 로컬 저장소에 저장된 상담 신청 데이터를 실시간으로 확인하고 상태를 변경할 수 있습니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Filters & Actions */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">상태 필터:</span>
            {[
              { id: 'all', label: '전체' },
              { id: 'pending', label: '접수대기' },
              { id: 'in_progress', label: '상담진행' },
              { id: 'completed', label: '상담완료' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  filterStatus === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              disabled={records.length === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON 내보내기</span>
            </button>
            <button
              onClick={handleClearAll}
              disabled={records.length === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 rounded-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>전체 비우기</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {records.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-700">저장된 상담 내역이 없습니다.</div>
              <p className="text-xs text-slate-500 mt-1">
                상담 신청 폼을 작성하여 제출하면 이곳에 실시간으로 기록됩니다.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-500">
              선택한 상태에 해당하는 상담 내역이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => {
                const isSelected = selectedRecordId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRecordId(isSelected ? null : item.id)}
                    className={`border rounded-xl p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            item.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.status === 'completed'
                            ? '상담완료'
                            : item.status === 'in_progress'
                            ? '상담진행'
                            : '접수대기'}
                        </span>
                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        <span className="text-xs text-slate-400">·</span>
                        <div className="text-xs font-semibold text-amber-700">{item.courseName}</div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>{item.createdAtFormatted}</span>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          title="삭제"
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span>연락처: <strong className="text-slate-800 font-mono">{item.phone}</strong></span>
                      <span>이메일: <strong className="text-slate-800">{item.email}</strong></span>
                      <span>희망시간: <span className="text-slate-700">{item.preferredTime}</span></span>
                    </div>

                    {/* Detailed Accordion */}
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-3">
                        <div>
                          <div className="text-slate-400 font-medium mb-1">문의 내용</div>
                          <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {item.message}
                          </p>
                        </div>

                        {item.adminNotes && (
                          <div>
                            <div className="text-slate-400 font-medium mb-1">상담 메모</div>
                            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-900 border border-amber-200/60">
                              {item.adminNotes}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-slate-400">상태 변경:</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={(e) => handleStatusChange(item.id, 'pending', e)}
                              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                                item.status === 'pending'
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              대기중
                            </button>
                            <button
                              onClick={(e) => handleStatusChange(item.id, 'in_progress', e)}
                              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                                item.status === 'in_progress'
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              진행중
                            </button>
                            <button
                              onClick={(e) => handleStatusChange(item.id, 'completed', e)}
                              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                                item.status === 'completed'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              완료
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
